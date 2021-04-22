import { Router } from "express";
import auth from "../config/auth.js";
import {
  budgetAction_post,
  budgetAction_edit,
  budgetAction_delete,
} from "../controllers/budgetActionsController.js";

const router = Router();

router.post("/", auth.required, budgetAction_post);
router.post("/edit", auth.required, budgetAction_edit);
router.post("/remove", auth.required, budgetAction_delete);
export default router;
