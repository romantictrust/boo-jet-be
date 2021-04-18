import { Router } from "express";
import auth from "../config/auth.js";
import {
  budget_post,
  budget_edit,
  budgets_get,
  budget_delete,
} from "../controllers/budgetsController.js";

const router = Router();

router.post("/", auth.required, budget_post);
router.post("/edit", auth.required, budget_edit);
router.get("/:userId", auth.required, budgets_get);
router.post("/remove", auth.required, budget_delete);
export default router;
