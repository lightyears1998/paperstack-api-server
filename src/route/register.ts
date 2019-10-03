import { checkEmailAvailabilty, hashPassword } from "./../model/User";

import { RequestHandler } from "express";
import { User } from "../model";

/**
 * 注册新用户
 */
const register: RequestHandler = async function (req, res) {
  const email: string = typeof req.body.email === "string" ? req.body.email : "";
  const password: string = typeof req.body.password === "string" ? req.body.password : "";

  /*
   * @TODO
   * 验证邮箱地址格式（validator）
   */

  const codeFail = false;
  const codeSuccess = true;

  if (email === "" || password === "") {
    res.json({
      result: codeFail
    });
    return;
  }

  const emailOk = checkEmailAvailabilty(email);
  if (!emailOk) {
    res.json({
      result: codeFail
    });
    return;
  }

  await User.create({
    email:        email,
    passwordHash: await hashPassword(password)
  });
  res.json({
    result: codeSuccess
  });
};


export default register;
