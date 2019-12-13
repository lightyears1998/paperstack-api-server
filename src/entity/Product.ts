import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User, CollectionItem, ProductComment } from "./";


/**
 * 作业
 */
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    /**
     * 作业提交方
     */
    @ManyToOne(() => User)
    committer: User

    /**
     * 所属的作业收集项
     */
    @ManyToOne(() => CollectionItem)
    item: CollectionItem

    /**
     * 作业是否公开
     */
    @Column()
    isPublic?: boolean = false

    /**
     * 作业文件哈希
     */
    @Column({
        nullable: true
    })
    fileHash?: string = ""

    /**
     * 作业评分
     */
    @Column({
        nullable: true
    })
    rating?: number

    /**
     * 作业评论
     */
    @OneToMany(() => ProductComment, comment => comment.product)
    comments: ProductComment[];
}
