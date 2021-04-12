import { Router } from "express";
import { currencies_get } from "../controllers/apiController.js";

const router = Router();

router.get("/currencies", currencies_get);
export default router;
