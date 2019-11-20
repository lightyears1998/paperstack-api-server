import * as randomstring from "randomstring";
import * as Sequelize from "sequelize";
import  { Model } from "sequelize";
import sequelize from "../Database";


class Authkey extends Model {
  value: string;
  usedAt: Date;

  userId: number;

  static generateNewKey(): string {
      return randomstring.generate(32);
  }
}

Authkey.init({
    value: {
        type:       Sequelize.STRING,
        primaryKey: true,
        allowNull:  false,
        comment:    "访问密钥值" },
    usedAt: {
        type:         "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull:    false,
        comment:      "访问密钥上次使用时间" }
}, { sequelize });


export default Authkey;
