import { Router } from "express";
import auth from "../config/auth.js";
import {
  collectEmail_post,
  confirmEmail_get,
} from "../controllers/mailingController.js";

const router = Router();

router.post("/collect", collectEmail_post);
router.post("/confirm", confirmEmail_get);
router.post("/reconfirm", auth.optional, confirmEmail_get);
router.get("/confirm/:id", confirmEmail_get);

export default router;