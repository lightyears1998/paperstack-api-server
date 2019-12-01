import { Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

/**
 * 班级
 */
@Entity()
export class Class {
    @PrimaryColumn()
    name: string
}
