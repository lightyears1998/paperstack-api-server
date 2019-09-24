import config from "./config";

import Sequelize from "sequelize";

const dbconfig = config.database;

const sequelize = new Sequelize.Sequelize(dbconfig.db, dbconfig.user, dbconfig.pass, {
  host:    dbconfig.host,
  dialect: "postgres"
});

sequelize
  .authenticate()
  .catch(err => {
    console.error("数据库连接失败：", err);
    process.exit(1);
  });

export default sequelize;
