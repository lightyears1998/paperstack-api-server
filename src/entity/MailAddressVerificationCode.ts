import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";


/**
 * 邮箱地址验证码
 */
@Entity()
export class MailAddressVerificationCode {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    token: string

    @CreateDateColumn()
    createAt: Date

    /**
     * 邮箱地址验证码的有效期
     *
     * 默认值为1000 * 60 * 60 * 24毫秒，即24小时。
     */
    expirationInMiliseconds = 1000 * 60 * 60 * 24;


    public isExpired(): boolean {
        return new Date().getTime() - this.createAt.getTime() < this.expirationInMiliseconds;
    }
}
