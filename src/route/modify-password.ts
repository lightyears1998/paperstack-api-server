import { User, Authkey } from "./../model";
import { comparePassword, hashPassword } from "../model/User";

import { RequestHandler } from "express";


const modifyPassword: RequestHandler = async function (req, res) {
  let authkey: string = typeof req.body.authkey === "string" ? req.body.authkey : "";
  let oldPassword: string = typeof req.body.oldPassword === "string" ? req.body.oldPassword : "";
  let newPassword: string = typeof req.body.newPassword === "string" ? req.body.newPassword : "";

  if (authkey === "" || oldPassword === "" || newPassword === "") {
    res.json({
      message: "修改失败"
    });
    return;
  }

  let key: Authkey = await Authkey.findOne({
    where: {
      value: authkey
    }
  });
  if (key == null) {
    res.json({
      message: "修改失败"
    });
    return;
  }

  let user = await User.findOne({
    where: {
      id: key.userId
    }
  });
  if (user == null) {
    res.json({
      message: "修改失败"
    });
    return;
  }

  let passwordMatch: boolean = await comparePassword(oldPassword, user.passwordHash);
  if (!passwordMatch) {
    res.json({
      message: "修改失败"
    });
    return;
  }

  let newPasswordHash: string = await hashPassword(newPassword);

  user.update({
    passwordHash: newPasswordHash
  });
  res.json({
    message: "修改成功"
  });
};

export default modifyPassword;
