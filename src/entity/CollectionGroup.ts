import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, Column, Unique, getManager } from "typeorm";
import { generate as randomString } from "randomstring";
import { CollectionItem, User } from "./";

/**
 * 作业收集组
 */
@Entity()
@Unique(["shareCode"])
export class CollectionGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 作业收集发起方
     */
    @ManyToOne(() => User)
    organizer?: User;

    /**
     * 作业收集参与方
     */
    @ManyToMany(() => User)
    @JoinTable()
    attendants: User[];

    /**
     * 作业收集组的名称
     */
    @Column({
        nullable: true
    })
    name?: string

    /**
     * 分享码
     *
     * 目前还没有实现这个功能。
     */
    @Column({
        nullable: true
    })
    shareCode?: string

    /**
     * 作业收集组中的作业收集项
     */
    @OneToMany(() => CollectionItem, item => item.group)
    items: CollectionItem[];

    /**
     * 生成全局唯一的分享码并持久化到数据库中。
     */
    public async generateShareCode(): Promise<CollectionGroup> {
        const db = getManager();

        while (!this.shareCode) {
            const shareCode = randomString({ length: 4, readable: true });
            try {
                this.shareCode = shareCode;
                await db.save(this);
            } catch {
                this.shareCode = null;
            }
        }

        return this;
    }

    /**
     * 向作业收集组中添加作业收集项。
     */
    public async addCollectionItem(name: string, requirement?: string, deadline?: Date): Promise<CollectionItem> {
        const db = getManager();

        let item = new CollectionItem();
        item.group = this;
        item.name = name;
        item.requirement = requirement;
        item.deadline = deadline;

        item = await db.save(item);
        return item;
    }

    /**
     * 将用户添加为参与方。
     * @param user 待添加为参与方的用户
     */
    public async addAttendant(user: User): Promise<void> {
        const db = getManager();

        if (!this.attendants) {
            this.attendants = (await db.findOne(CollectionGroup, this.id, { relations: ["attendants"] })).attendants;
        }
        this.attendants.push(user);

        await db.save(this);
    }
}
