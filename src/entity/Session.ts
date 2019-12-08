import { Entity, Column, PrimaryColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import * as randomstring from "randomstring";
import { User } from "./";

/**
 * 用户会话
 */
@Entity()
export class Session {
    /**
     * 会话凭证
     */
    @PrimaryColumn()
    token: string

    /**
     * 会话凭证上次使用时间
     */
    @UpdateDateColumn()
    lastUsed: Date

    /**
     * 会话凭证对应的用户
     */
    @ManyToOne(type => User, user => user.sessions)
    user: User

    /**
     * 用户会话的有效期
     *
     * 默认值为1000 * 60 * 60 * 24 * 7毫秒，即7天。
     */
    expirationInMiliseconds = 1000 * 60 * 60 * 24 * 7;

    public constructor() {
        this.token = randomstring.generate(32);
    }

    /**
     * 检查用户会话是否在有效期内。
     */
    isValid(): boolean {
        return new Date().getTime() - this.lastUsed.getTime() < this.expirationInMiliseconds;
    }
}
