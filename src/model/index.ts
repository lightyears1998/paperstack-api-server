import sequelize from "../db";
import User from "./User";

sequelize.sync();

export {
  User
};
