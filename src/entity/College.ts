import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { ClassAndGrade } from "./";

/**
 * 学院
 */
@Entity()
export class College {
    @PrimaryColumn()
    name: string;

    @OneToMany(type => ClassAndGrade, classes => classes.college)
    classes: ClassAndGrade
}
