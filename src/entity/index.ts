import sequelize from "../Database";
import User from "./User";
import Authkey from "./Authkey";


User.hasMany(Authkey, { foreignKey: "userId" });

sequelize.sync();


export {
    User,
    Authkey
};