// import { RequestHandler } from "express";
// import { ResponseCode } from "./ResponseCode";
// import { ResponseJSON } from "./ResponseJSON";


// const modifyPassword: RequestHandler = async function (req, res) {
//     const authkey = String(req.body.authkey);
//     const oldPassword = String(req.body.oldPassword);
//     const newPassword = String(req.body.newPassword);

//     if (authkey === "" || oldPassword === "" || newPassword === "") {
//         res.json(new ResponseJSON(ResponseCode.Failure, "密码修改失败。"));
//         return;
//     }

//     const key: Authkey = await Authkey.findOne({
//         where: {
//             value: authkey
//         }
//     });
//     if (key == null) {
//         res.json(new ResponseJSON(ResponseCode.Failure, "密码修改失败。"));
//         return;
//     }

//     const user = await User.findOne({
//         where: {
//             id: key.userId
//         }
//     });
//     if (user == null) {
//         res.json(new ResponseJSON(ResponseCode.Failure, "密码修改失败。"));
//         return;
//     }

//     const passwordMatch: boolean = await comparePassword(oldPassword, user.passwordHash);
//     if (!passwordMatch) {
//         res.json(new ResponseJSON(ResponseCode.Failure, "密码修改失败。"));
//         return;
//     }

//     const newPasswordHash: string = await hashPassword(newPassword);

//     user.update({
//         passwordHash: newPasswordHash
//     });
//     res.json(new ResponseJSON(ResponseCode.Success, "密码修改成功。"));
// };

// export default modifyPassword;
