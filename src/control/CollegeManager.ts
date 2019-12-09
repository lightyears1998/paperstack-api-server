import { getManager } from "typeorm";
import { College } from "../entity";

/**
 * 学院管理器
 */
export class CollegeManager {
    /**
     * 创建指定名称的学院，若学院已经存在则什么都不干。
     * @param name 学院名称
     */
    static createCollege(name: string) {
        const db = getManager();
        
    }

    /**
     * 获取指定名称的学院，学院不存在时返回null。
     * @param name 学院名称
     */
    static async getCollege(name: string): Promise<College> {
        try {
            const db = getManager();
            return await db.findOneOrFail(College, {name: name});
        } catch {
            return null;
        }
    }
}
