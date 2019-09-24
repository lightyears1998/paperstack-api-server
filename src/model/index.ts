import sequelize from "../db";
import User from "./User";
import Authkey from "./Authkey";


User.hasMany(Authkey);

sequelize.sync();


export {
  User,
  Authkey
};
