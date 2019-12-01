import { PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";

/**
 * 教师
 */
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 工号
     */
    @Column()
    number: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}
