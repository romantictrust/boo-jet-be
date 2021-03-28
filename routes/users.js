import { Router } from "express";
import { user_post } from "../controllers/usersController.js";

const router = Router();

router.post("/", user_post);
export default router;
