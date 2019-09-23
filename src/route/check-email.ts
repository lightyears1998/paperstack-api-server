import { User } from "./../model";
import { RequestHandler } from "express";

/**
 * 检查由`req.body.email`指定邮箱地址是否未被占用。
 */
const checkEmail: RequestHandler = async function (req, res) {

  // 待添加邮箱地址大小写检查。

  let email: string = req.body.email || "";
  let emailCount: number = await User.count({ where: { email: email } });

  console.log(await User.findAll());

  res.json({
    available: email != "" && emailCount === 0
  });
};

export default checkEmail;
