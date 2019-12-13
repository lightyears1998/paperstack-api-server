import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { CollectionItem, ProductComment } from "./";

/**
 * 作业
 */
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    /**
     * 所属的作业收集项
     */
    @ManyToOne(() => CollectionItem)
    item: CollectionItem

    @Column()
    isPublic?: boolean

    @Column()
    fileHash?: string

    @Column()
    rating?: number

    @OneToMany(() => ProductComment, comment => comment.product)
    comments: ProductComment[];
}
