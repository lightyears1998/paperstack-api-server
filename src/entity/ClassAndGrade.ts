import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { College } from ".";

/**
 * 班级
 */
@Entity()
export class ClassAndGrade {
    @PrimaryColumn()
    name: string

    @ManyToOne(() => College, college => college.classes)
    college: College
}
