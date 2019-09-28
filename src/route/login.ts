import { User, Authkey } from "./../model";
import { comparePassword } from "../util";

import { RequestHandler } from "express";


const login: RequestHandler = async function (req, res) {
  let email: string = typeof req.body.email === "string" ? req.body.email : "";
  let password: string = typeof req.body.password === "string" ? req.body.password : "";

  const codeSuccess = 1;
  const codeEmailNotExist = 2;
  const codeEmailPasswordMismatch = 3;

  if (email === "") {
    res.json({
      result: codeEmailNotExist
    });
    return;
  }

  if (password === "") {
    res.json({
      result: codeEmailPasswordMismatch
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
      result: codeEmailNotExist
    });
    return;
  }

  let passwordMatched: boolean = await comparePassword(password, user.passwordHash);
  if (!passwordMatched) {
    res.json({
      result: codeEmailPasswordMismatch
    });
    return;
  }

  let authkey: string = Authkey.generateNewKey();
  user.createAuthkey({
    value: authkey
  });
  res.json({
    result:  codeSuccess,
    authkey: authkey
  });
};


export default login;
