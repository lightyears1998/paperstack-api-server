import { checkEmailAvailabilty, hashPassword } from "./../util";

import { RequestHandler } from "express";
import { User } from "../model";

/**
 * 注册新用户
 */
const register: RequestHandler = async function (req, res) {
  let email: string = typeof req.body.email === "string" ? req.body.email : "";
  let password: string = typeof req.body.password === "string" ? req.body.password : "";

  /*
   * @TODO
   * 验证邮箱地址格式（validator）
   */

  if (email === "" || password === "") {
    res.json({
      message: "注册失败"
    });
    return;
  }

  let emailOk = checkEmailAvailabilty(email);
  if (!emailOk) {
    res.json({
      message: "注册失败"
    });
    return;
  }

  await User.create({
    email:        email,
    passwordHash: await hashPassword(password)
  });
  res.json({
    message: "注册成功"
  });
};


export default register;
