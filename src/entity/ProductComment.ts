import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { User, Product } from "./";

/**
 * 作业评论
 */
@Entity()
export class ProductComment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product)
    product: Product

    @OneToOne(() => User)
    author: User;

    @Column()
    commentedAt: Date

    @Column()
    content: string;

    /**
     * 创建评论数据实体。
     * @param author 评论作者
     * @param content 评论内容
     */
    public constructor(author: User, content: string) {
        this.author = author;
        this.commentedAt = new Date();
        this.content = content;
    }
}
