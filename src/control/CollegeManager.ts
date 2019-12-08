import { getManager } from "typeorm";
import { College } from "../entity";

/**
 * 学院管理器
 */
export class CollegeManager {
    /**
     * 创建指定名称的学院
     * @param name 学院名称
     */
    static createCollege(name: string) {
        const college = new College(name);
    }

    static getCollege(): College {
        try {
            const db = getManager();

        } catch {
            return null;
        }
    }
}
