import { Router } from "express";
import auth from "../config/auth.js";
import { signup_post, login_post } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup_post);
router.post("/signin", login_post);
export default router;
