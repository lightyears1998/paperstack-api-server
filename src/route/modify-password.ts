import { RequestHandler } from "express";

/**
 * 检查由`req.body.email`指定邮箱地址是否未被占用。
 */
const modifyPassword: RequestHandler = async function (req, res) {
  let email: string = typeof req.body.email === "string" ? req.body.email : "";
};

export default modifyPassword;
