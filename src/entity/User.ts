import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, OneToMany, getManager } from "typeorm";
import * as bcrypt from "bcrypt";
import logger from "../Logger";
import { Session } from "./";


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
