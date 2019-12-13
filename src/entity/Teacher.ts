import { PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, Entity } from "typeorm";
import { User, UserType } from "./User";

/**
 * 教师
 */
@Entity()
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * 工号
     */
    @Column()
    number: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    /**
     * 创建教师的数据结构。
     * @param email 注册邮箱
     * @param number 教师工号
     */
    public constructor(email: string, number: string) {
        this.user = new User(email, UserType.Teacher);
        this.number = number;
    }
}
