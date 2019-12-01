// import { RequestHandler } from "express";
// import { isEmail } from "validator";
// import { checkEmailAvailabilty } from "../entity/User";
// import { ResponseJSON } from "./ResponseJSON";



// /**
//  * 检查由`req.body.email`指定邮箱地址是否未被占用。
//  */
// const checkEmail: RequestHandler = async function (req, res) {
//     const email = String(req.body.email);

//     const emailAvailable = isEmail(email) ? await checkEmailAvailabilty(email) : false;

//     const resJSON = new ResponseJSON();
//     resJSON.setResult({ emailAvailable: emailAvailable });

//     res.json(resJSON);
// };

// export default checkEmail;
