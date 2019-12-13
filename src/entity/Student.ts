import { PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, Entity } from "typeorm";
import { User, UserType } from "./";

/**
 * 学生
 */
@Entity()
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
    phoneNumber?: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    /**
     * 创建学生用户数据实例
     * @param email 注册邮箱
     */
    public constructor(email: string) {
        this.user = new User(email, UserType.Student);
    }
}
