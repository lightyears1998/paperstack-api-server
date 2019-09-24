import { User } from "./../model";
import { RequestHandler } from "express";
import Sequelize from "sequelize";

/**
 * 检查由`req.body.email`指定邮箱地址是否未被占用。
 */
const checkEmail: RequestHandler = async function (req, res) {
  let email: string = req.body.email || "";
  let emailCount: number = await User.count({ where: { email: { [Sequelize.Op.iLike]: email } } });

  res.json({
    available: email !== "" && emailCount === 0
  });
};

export default checkEmail;
