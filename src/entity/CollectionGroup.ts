import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CollectionItem, User } from "./";

/**
 * 作业收集组
 */
@Entity()
export class CollectionGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    organizer?: User;

    @ManyToMany(() => User)
    @JoinTable()
    attendants: User[];

    @OneToMany(() => CollectionItem, item => item.group)
    items: CollectionItem[];
}
