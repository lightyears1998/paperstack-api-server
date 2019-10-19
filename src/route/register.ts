import { checkEmailAvailabilty, hashPassword } from "./../model/User";
import { User } from "../model";
import { ResponseCode } from "./ResponseCode";
import { ResponseJSON } from "./ResponseJSON";
import { RequestHandler } from "express";
import { isEmail } from "validator";


/**
 * 注册新用户
 */
const register: RequestHandler = async function (req, res) {
  const email = String(req.body.email);
  const password = String(req.body.password) ;

  if (!isEmail(email)) {
    res.json(new ResponseJSON(ResponseCode.Failure, "注册失败，邮箱地址格式不正确。"));
    return;
  }

  if (password === "") {
    res.json(new ResponseJSON(ResponseCode.PasswordEmpty, "注册失败，密码不能为空。"));
    return;
  }

  const emailOk = checkEmailAvailabilty(email);
  if (!emailOk) {
    res.json(new ResponseJSON(ResponseCode.EmailAlreadyRegisterd, "注册失败，邮箱地址已被注册。"));
    return;
  }

  await User.create({
    email:        email,
    passwordHash: await hashPassword(password)
  });
  res.json(new ResponseJSON(ResponseCode.Success, "注册成功。"));
};


export default register;
