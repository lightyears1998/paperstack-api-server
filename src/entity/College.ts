import { Entity, PrimaryColumn } from "typeorm";

/**
 * 学院
 */
@Entity()
export class College {
    @PrimaryColumn()
    name: string;
}
