import { Router as ExpressRouter } from "express";
import Router from "./Router";
import checkEmail from "./check-email";
import register from "./register";
import login from "./login";
import logout from "./logout";
import modifyPassword from "./modify-password";


const router = ExpressRouter();

router.post("/check/email", checkEmail);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/modify/password", modifyPassword);

export default router;
export { Router };
