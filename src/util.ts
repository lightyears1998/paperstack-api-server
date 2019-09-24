import Sequelize from "sequelize";
import { User } from "./model";

/**
 * 检查邮箱地址是否已被注册
 * @param email 待检查的邮箱
 */
export async function checkEmailAvailabilty(email: string) : Promise<boolean> {
  if (email === "") {
    return false;
  }
  let emailCount: number = await User.count({ where: { email: { [Sequelize.Op.iLike]: email } } });
  return emailCount === 0;
}
