import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, Column } from "typeorm";
import { CollectionItem, User } from "./";

/**
 * 作业收集组
 */
@Entity()
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
}
