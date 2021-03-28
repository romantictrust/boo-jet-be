import { Router } from "express";
import usersRoutes from "./users.js";
import authRoutes from "./auth.js";
import mailingRoutes from "./mailing.js";

const router = Router();

router.use("api/users", usersRoutes);
router.use("/mailing", mailingRoutes);
router.use("/", authRoutes);

export default router;
