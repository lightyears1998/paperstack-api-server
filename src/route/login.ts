import { User, Authkey } from "./../model";
import { comparePassword } from "../util";

import { RequestHandler } from "express";


const login: RequestHandler = async function (req, res) {
  let email: string = typeof req.body.email === "string" ? req.body.email : "";
  let password: string = typeof req.body.password === "string" ? req.body.password : "";

  if (email === "") {
    res.json({
      message: "邮箱不存在"
    });
    return;
  }

  if (password === "") {
    res.json({
      message: "邮箱或密码错误"
    });
    return;
  }

  let user: User;
  await User.findOne({
    where: {
      email: email
    }
  }).then(res => user = res);

  if (user == null) {
    res.json({
      message: "邮箱或密码错误"
    });
    return;
  }

  let passwordMatched: boolean = await comparePassword(password, user.passwordHash);
  if (!passwordMatched) {
    res.json({
      message: "邮箱或密码错误"
    });
    return;
  }

  let authkey: string = Authkey.generateNewKey();
  user.createAuthkey({
    value: authkey
  });
  res.json({
    message: "登陆成功",
    authkey: authkey
  });
};


export default login;
