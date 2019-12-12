import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./";

/**
 * 管理员
 */
@Entity()
export class Administrator {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}
