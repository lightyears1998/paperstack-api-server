import { Entity, CreateDateColumn, Column } from "typeorm";


/**
 * 邮箱地址验证码
 */
@Entity()
export class MailAddressVerificationCode {
    @Column()
    email: string

    @Column()
    token: string

    @CreateDateColumn()
    createAt: Date

    public isExpired() {

    }
}
