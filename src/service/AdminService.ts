import { EntityManager, getManager } from "typeorm";
import { AdminConfiguration } from "../Configuration";
import { Administrator } from "../entity";
import logger from "../Logger";


/**
 * 平台管理服务
 */
export class AdminService {
    private static config: AdminConfiguration;
    private static db: EntityManager;

    public static async start(config: AdminConfiguration): Promise<void> {
        this.config = config;
        this.db = getManager();
        await this.ensureAdminAccountExists();
    }

    /**
     * 确保系统中至少有一个管理员用户。
     * 当系统中没有管理员用户时（通常是系统第一次启动时），
     * 在系统中建立由平台管理配置文件指定的默认管理员账户。
     */
    public static async ensureAdminAccountExists(): Promise<void> {
        const adminCount = await this.db.count(Administrator);
        if (adminCount < 1) {
            if (!(this.config && this.config.default && this.config.default.email && this.config.default.pass)) {
                logger.info("当前系统中没有管理员账户。")
                logger.info("未在配置文件中的admin.default字段指定默认管理员账户和密码，因此未创建默认管理员账户。");
                return;
            }

            try {
                const admin = new Administrator(this.config.default.email);
                await admin.user.modifyPassword(this.config.default.pass);
                await this.db.save(admin.user);
                await this.db.save(admin);
            } catch {
                logger.error("当前系统中没有管理员账户，亦无法创建管理员账户。");
                logger.error("请检查系统中是否有用户占用了默认管理员账户的的邮箱地址。");
            }
        }
    }

    public static stop(): void {
        this.db = null;
    }
}
