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
    classes: ClassAndGrade[]

    /**
     * 创建指定名称的学院数据结构。
     * @param name 学院名称
     */
    public constructor(name: string) {
        this.name = name;
        this.classes = [];
    }

    /**
     * 创建指定名称的下辖班级数据结构。
     * @param name 带创建的班级的名称
     */
    public createClass() {
        const classAndGrade = new ClassAndGrade(this, name);
    }

    /**
     * 删除下辖班级中指定名称的班级。
     * @param name 待删除的班级名称
     */
    public removeClass(name: string): void {

    }
}
