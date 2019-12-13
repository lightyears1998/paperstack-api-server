import { Mail } from "../entity";
import logger from "../Logger";


/**
 * 邮件服务
 * @todo 待实现
 */
export class MailService {
    static sendMail(mail: Mail): void {
        throw "未实现。";
        logger.info(mail);
    }
}
