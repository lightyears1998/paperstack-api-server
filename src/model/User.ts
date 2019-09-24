import sequelize from "./../db";
import Authkey from "./Authkey";

import Sequelize, { Model } from "sequelize";
import { HasManyCreateAssociationMixin } from "sequelize";


class User extends Model {
  id: number;
  email: string;
  passwordHash: string;

  createdAt: Date;
  updatedAt: Date;

  createAuthkey: HasManyCreateAssociationMixin<Authkey>;
}

User.init({
  email: {
    type:      Sequelize.STRING,
    allowNull: false,
    comment:   "邮箱地址，大小写不敏感" },
  passwordHash: {
    type:      Sequelize.STRING,
    allowNull: false,
    comment:   "密码哈希，大小写不敏感" }
}, { sequelize });


export default User;
