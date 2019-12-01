import { Entity, PrimaryColumn, Column } from "typeorm";

/**
 * 作业评论
 */
@Entity()
export class ProductComment {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    content: string;
}
