import sequelize from "./../db";

import Sequelize, { Model } from "sequelize";

class User extends Model {}

User.init({
  email:        { type: Sequelize.STRING, allowNull: false, comment: "大小写不敏感" },
  passwordHash: { type: Sequelize.STRING, allowNull: false, comment: "大小写不敏感" }
}, { sequelize });

export default User;
