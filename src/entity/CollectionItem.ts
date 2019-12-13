import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { CollectionGroup, Product } from "./";

/**
 * 作业收集项
 */
@Entity()
export class CollectionItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 所属的作业收集组
     */
    @ManyToOne(() => CollectionGroup, group => group.items)
    group: CollectionGroup

    /**
     * 作业要求
     */
    @Column({
        nullable: true
    })
    requirement: string;

    @Column({
        nullable: true
    })
    deadline: Date

    /**
     * 作业收集项下的作业
     */
    @OneToMany(() => Product, product => product.item)
    products: Product[];
}
