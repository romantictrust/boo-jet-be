import { Router } from "express";
import errorHandler from "../handlers/errorHandler.js";
import auth from "../config/auth.js";
import {
  budget_post,
  budget_edit,
  budgets_get,
  budget_delete,
} from "../controllers/budgetsController.js";

const router = Router();

router.post("/", auth.required, errorHandler(budget_post));
router.post("/edit", auth.required, errorHandler(budget_edit));
router.get("/:userId", auth.required, errorHandler(budgets_get));
router.post("/remove", auth.required, errorHandler(budget_delete));
export default router;
