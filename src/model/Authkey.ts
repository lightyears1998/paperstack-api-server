import sequelize from "./../db";

import randomstring from "randomstring";
import Sequelize, { Model } from "sequelize";


class Authkey extends Model {
  value: string;
  usedAt: Date;

  static generateNewKey(): string {
    return randomstring.generate(32);
  }
}

Authkey.init({
  value: {
    type:      Sequelize.STRING,
    allowNull: false,
    comment:   "访问密钥值" },
  usedAt: {
    type:         "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull:    false,
    comment:      "访问密钥上次使用时间" }
}, { sequelize });


export default Authkey;
