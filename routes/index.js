import { Router } from "express";
import apiRoutes from "./api.js";
import usersRoutes from "./users.js";
import budgetsRoutes from "./budgets.js";
import widgetsRoutes from "./widgets.js";
import budgetActionsRoutes from "./actions.js";
import authRoutes from "./auth.js";
import mailingRoutes from "./mailing.js";

const router = Router();

router.use("/api", apiRoutes);
router.use("/users", usersRoutes);
router.use("/budgets", budgetsRoutes);
router.use("/widgets", widgetsRoutes);
router.use("/actions", budgetActionsRoutes);
router.use("/mailing", mailingRoutes);
router.use("/", authRoutes);

export default router;
