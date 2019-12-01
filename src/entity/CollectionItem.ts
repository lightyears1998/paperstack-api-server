import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { CollectionGroup } from "./";

/**
 * 作业收集项
 */
@Entity()
export class CollectionItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => CollectionGroup, group => group.items)
    group: CollectionGroup
}
