import { Router } from "express";
import auth from "../config/auth.js";
import errorHandler from "../handlers/errorHandler.js";
import {
  collectEmail_post,
  confirmEmail_get,
} from "../controllers/mailingController.js";

const router = Router();

router.post("/collect", errorHandler(collectEmail_post));
router.post("/reconfirm", auth.optional, errorHandler(collectEmail_post));
router.get("/confirm/:id", errorHandler(confirmEmail_get));

export default router;
