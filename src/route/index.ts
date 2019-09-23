import { Router } from "express";
import checkEmail from "./check-email";

const router = Router();

router.post("/check/email", checkEmail);


export default router;
