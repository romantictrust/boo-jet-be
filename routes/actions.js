import { Router } from "express";
import auth from "../config/auth.js";
import errorHandler from "../handlers/errorHandler.js";
import {
  budgetAction_post,
  budgetAction_edit,
  budgetAction_delete,
} from "../controllers/budgetActionsController.js";

const router = Router();

router.post("/", auth.required, errorHandler(budgetAction_post));
router.post("/edit", auth.required, errorHandler(budgetAction_edit));
router.post("/remove", auth.required, errorHandler(budgetAction_delete));
export default router;
