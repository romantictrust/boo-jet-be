import { Router } from "express";
import auth from "../config/auth.js";
import {
  widget_post,
  widgets_get,
  widget_delete,
} from "../controllers/widgetsController.js";

const router = Router();

router.post("/", auth.required, widget_post);
router.get("/:userId", auth.required, widgets_get);
router.post("/remove", auth.required, widget_delete);
export default router;
