import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, OneToMany, getManager, AdvancedConsoleLogger } from "typeorm";
import * as bcrypt from "bcrypt";
import logger from "../Logger";
import { Session } from "./";


/**
 * 系统中的用户类型包括：管理员、学生和教师。
 */
export enum UserType {
    Administrator = "Administrator",
    Student = "Student",
    Teacher = "Teacher"
}


/**
 * 用户
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    /**
     * 注册邮箱
     */
    @Column()
    email: string;

    /**
     * 密码哈希
     */
    @Column()
    passwordHash: string;

    /**
     * 注册时间
     */
    @CreateDateColumn()
    createdAt: Date;

    /**
     * 信息更新时间
     */
    @UpdateDateColumn()
    updatedAt: Date;

    /**
     * 用户类型
     */
    @Column()
    type: UserType;

    /**
     * 当前进行中的用户会话
     */
    @OneToMany(type => Session, session => session.user)
    sessions: Session[];

    /**
     * 创建用户数据结构
     *
     * 创建用户的数据结构后，需要使用`modifyPassword()`修改密码。
     *
     * @param email 注册邮箱
     * @param type 用户类型
     */
    public constructor(email: string, type: UserType) {
        this.email = email;
        this.type = type;
    }

    /**
     * 修改密码。
     * @param newPassword 新密码
     */
    async modifyPassword(newPassword: string): Promise<void> {
        const saltRounds = 10;

        let passwordHash = "";
        await bcrypt.hash(newPassword, saltRounds)
            .then((hash) => {
                passwordHash = hash;
            })
            .catch(reason => {
                logger.error(reason);
            });

        this.passwordHash = passwordHash;
    }

    /**
     * 验证密码是否正确。
     * @param password 待验证的密码
     */
    async verifyPassword(password: string): Promise<boolean> {
        let result = false;

        await bcrypt.compare(password, this.passwordHash)
            .then((res) => {
                result = res;
            });

        return result;
    }

    // 新建用户会话。
    beginSession() {

    }
}
