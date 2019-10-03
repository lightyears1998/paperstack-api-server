import { User, Authkey } from "./../model";
import { comparePassword, hashPassword } from "../model/User";

import { RequestHandler } from "express";


const modifyPassword: RequestHandler = async function (req, res) {
  const authkey: string = typeof req.body.authkey === "string" ? req.body.authkey : "";
  const oldPassword: string = typeof req.body.oldPassword === "string" ? req.body.oldPassword : "";
  const newPassword: string = typeof req.body.newPassword === "string" ? req.body.newPassword : "";

  if (authkey === "" || oldPassword === "" || newPassword === "") {
    res.json({
      message: "修改失败"
    });
    return;
  }

  const key: Authkey = await Authkey.findOne({
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

  const user = await User.findOne({
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

  const passwordMatch: boolean = await comparePassword(oldPassword, user.passwordHash);
  if (!passwordMatch) {
    res.json({
      message: "修改失败"
    });
    return;
  }

  const newPasswordHash: string = await hashPassword(newPassword);

  user.update({
    passwordHash: newPasswordHash
  });
  res.json({
    message: "修改成功"
  });
};

export default modifyPassword;
