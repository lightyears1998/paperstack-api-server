import checkEmail from "./check-email";
import register from "./register";

import { Router } from "express";


const router = Router();

router.post("/check/email", checkEmail);
router.post("/register", register);

export default router;
