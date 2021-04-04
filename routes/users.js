import { Router } from "express";
import auth from "../config/auth.js";
import { user_post, user_get } from "../controllers/usersController.js";

const router = Router();

router.post("/", auth.required, user_post);
router.get("/", auth.required, user_get);
export default router;
