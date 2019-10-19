import { RequestHandler } from "express";
import { comparePassword } from "../model/User";
import { Authkey, User } from "./../model";
import { ResponseCode } from "./ResponseCode";
import { ResponseJSON } from "./ResponseJSON";


/**
 * 登录路由
 */
const login: RequestHandler = async function (req, res) {
  const email = String(req.body.email);
  const password = String(req.body.password) ;


  if (email === "") {
    res.json(new ResponseJSON(ResponseCode.EmailNotRegistered, "邮箱地址未注册。"));
    return;
  }

  if (password === "") {
    res.json(new ResponseJSON(ResponseCode.PasswordEmpty, "密码不能为空。"));
    return;
  }

  let user: User;
  await User.findOne({
    where: {
      email: email
    }
  }).then(res => user = res);

  if (user == null) {
    res.json(new ResponseJSON(ResponseCode.EmailNotRegistered, "邮箱地址未注册。"));
    return;
  }

  const passwordMatched: boolean = await comparePassword(password, user.passwordHash);
  if (!passwordMatched) {
    res.json(new ResponseJSON(ResponseCode.PasswordMismatch, "用户名与密码不匹配"));
    return;
  }

  const authkey: string = Authkey.generateNewKey();
  user.createAuthkey({
    value: authkey
  });
  res.json(new ResponseJSON(
    ResponseCode.Success,
    "登录成功",
    {
      authkey: authkey
    }
  ));
};


export default login;
