import { Router } from "express";
import errorHandler from "../handlers/errorHandler.js";
import { signup_post, login_post } from "../controllers/authController.js";

const router = Router();

router.post("/signup", errorHandler(signup_post));
router.post("/signin", errorHandler(login_post));
export default router;
