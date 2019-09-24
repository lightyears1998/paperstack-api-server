import { User } from "./model";

import bcrypt from "bcrypt";
import Sequelize from "sequelize";


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


/**
 * 获取密码哈希
 * @param password 待哈希的密码
 * @returns 密码哈希
 */
export async function hashPassword(password: string) : Promise<string> {
  const saltRounds = 10;

  let passwordHash = "";
  await bcrypt.hash(password, saltRounds)
    .then((hash) => {
      passwordHash = hash;
    })
    .catch(reason => {
      console.error(reason);
    });

  return passwordHash;
}


/**
 * 比较密码与哈希是否相符
 * @param password 密码
 * @param hash 哈希
 * @returns 密码与哈希是否相符
 */
export async function comparePassword(password, hash) : Promise<boolean> {
  let result = false;

  await bcrypt.compare(password, hash)
    .then((res) => {
      result = res;
    });

  return result;
}
