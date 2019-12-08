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

    /**
     * 在指定学院下创建班级结构
     * @param college 学院
     * @param name 班级名称
     */
    public constructor(college: College, name: string) {
        this.name = name;
        this.college = college;
    }

    /**
     * 移除班级时，将所有引用此班级的学生的班级设置为空。
     */
    public setReferenceToNull() {
        throw "待实现！";
    }
}
