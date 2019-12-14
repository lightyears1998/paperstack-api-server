import { getManager, EntityManager, Db } from "typeorm";
import { User, MailAddressVerificationCode } from "../entity";


/**
 * 注册子系统：用户邮箱地址验证服务
 */
export class UserMailAddressVerificationService {
    private static db: EntityManager;

    /**
     * 启动服务。
     * 在启动用户邮箱地址验证服务前，数据库服务必须启动。
     */
    public static start() {
        this.db = getManager();
    }

    /**
     * 停止服务。
     */
    public static async stop() {
        this.db = null;
    }


    /**
     * 返回对应的邮箱地址是否已经被注册。
     * 
     * 注意邮箱地址不区分大小写，即“test@test.com”与“TEST@test.com”会被视为同一个邮箱地址。
     * @param email 待检查的邮箱地址
     */
    public static async checkIfEmailIsRegisterd(email: string): Promise<boolean> {
        email = email.toLowerCase(); // 数据库中的邮箱地址全部按小写储存。
        return await this.db.count(User, { email: email }) > 0;
    }

    public static async generateEmailVerificationCode(email: string) {
        email = email.toLowerCase(); // 先转换邮箱地址为小写。
        MailAddressVerificationCode
    }
}  
