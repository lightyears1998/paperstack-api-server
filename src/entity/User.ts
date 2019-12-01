import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import logger from "../Logger";
import { Session } from "./";


export enum UserType {
    "Administrator",
    "Student",
    "Teacher"
}


/**
 * 用户
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    type: UserType;

    @OneToMany(type => Session, session => session.user)
    sessions: Session[];

    /**
     * 修改密码。
     * @param newPassword 新密码
     */
    modifyPassword(newPassword: string): void {

    }

    /**
     * 验证密码是否正确。
     * @param password 待验证的密码
     */
    verifyPassword(password: string): boolean {
        return false;
    }

    // 新建用户会话。
    newSession() {

    }
}


/**
 * 检查邮箱地址是否已被注册
 * @param email 待检查的邮箱
 */
/*
 * export async function checkEmailAvailabilty(email: string): Promise<boolean> {
 *     if (email === "") {
 *         return false;
 *     }
 *     const emailCount: number = await User.count({ where: { email: { [Sequelize.Op.iLike]: email } } });
 *     return emailCount === 0;
 * }
 */


/**
 * 获取密码哈希
 * @param password 待哈希的密码
 * @returns 密码哈希
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    let passwordHash = "";
    await bcrypt.hash(password, saltRounds)
        .then((hash) => {
            passwordHash = hash;
        })
        .catch(reason => {
            logger.error(reason);
        });

    return passwordHash;
}


/**
 * 比较密码与哈希是否相符
 * @param password 密码
 * @param hash 哈希
 * @returns 密码与哈希是否相符
 */
export async function comparePassword(password, hash): Promise<boolean> {
    let result = false;

    await bcrypt.compare(password, hash)
        .then((res) => {
            result = res;
        });

    return result;
}


export default User;
