import { RequestHandler } from "express";
import { checkEmailAvailabilty } from "./../util";

/**
 * 检查由`req.body.email`指定邮箱地址是否未被占用。
 */
const checkEmail: RequestHandler = async function (req, res) {
  let email: string = typeof req.body.email === "string" ? req.body.email : "";

  /*
   * @TODO
   * 验证邮箱地址格式（validator）
   */

  res.json({
    available: await checkEmailAvailabilty(email)
  });
};

export default checkEmail;
