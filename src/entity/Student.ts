import { PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./";

/**
 * 学生
 */
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 学号
     */
    @Column()
    number: string;

    /**
     * 电话号码
     */
    @Column()
    phoneNumber: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}
