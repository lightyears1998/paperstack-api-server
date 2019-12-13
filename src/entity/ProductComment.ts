import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User, Product } from "./";

/**
 * 作业评论
 */
@Entity()
export class ProductComment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 所评论的作业
     */
    @ManyToOne(() => Product)
    product: Product

    /**
     * 评论作者
     */
    @OneToOne(() => User)
    @JoinColumn()
    author: User;

    /**
     * 评论时间
     */
    @Column()
    commentedAt: Date

    /**
     * 评论内容
     */
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
