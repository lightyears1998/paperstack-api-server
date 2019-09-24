import checkEmail from "./check-email";
import register from "./register";
import login from "./login";
import modifyPassword from "./modify-password";

import { Router } from "express";



const router = Router();

router.post("/check/email", checkEmail);
router.post("/register", register);
router.post("/login", login);
router.post("/modify/password", modifyPassword);

export default router;
