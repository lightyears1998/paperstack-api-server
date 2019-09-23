import sequelize from "./../db";
import Sequelize, { Model } from "sequelize";

class User extends Model {}

User.init({
  email:        { type: Sequelize.STRING, allowNull: false },
  passwordHash: { type: Sequelize.STRING, allowNull: false }
}, { sequelize });

export default User;
