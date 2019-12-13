import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CollectionItem } from "./";

/**
 * 作业收集组
 */
@Entity()
export class CollectionGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => CollectionItem, item => item.group)
    items: CollectionItem[];
}
