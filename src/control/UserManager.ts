import { getManager, EntityManager } from "typeorm";
import { User, Student } from "../entity";


/**
 * 用户管理器
 */
export class UserManager {
    private static db: EntityManager;

    public static start(): void {
        this.db = getManager();
    }

    public static stop(): void {
        this.db = null;
    }

    /**
     * 根据邮箱地址定位用户。
     * @param email 用户邮箱
     */
    public static async findUserByEmail(email: string): Promise<User | null> {
        email = email.toLowerCase();
        try {
            const user = await this.db.findOneOrFail(User, { email: email });
            return user;
        } catch {
            return null;
        }
    }

    /**
     * 创建新的学生用户。
     * @param email 注册邮箱
     * @param password 密码
     * @returns 是否创建成功
     */
    public static async newStudent(email: string, password: string): Promise<boolean> {
        email = email.toLowerCase();
        try {
            const student = new Student(email);
            await student.user.modifyPassword(password);
            await this.db.save(student.user);
            await this.db.save(student);

            return true;
        } catch {
            return false;
        }
    }
}
