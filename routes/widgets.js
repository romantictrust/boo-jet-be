import { Router } from "express";
import auth from "../config/auth.js";
import errorHandler from "../handlers/errorHandler.js";
import {
  widget_post,
  widgets_get,
  widget_delete,
  widget_edit,
} from "../controllers/widgetsController.js";

const router = Router();

router.post("/", auth.required, errorHandler(widget_post));
router.get("/:userId", auth.required, errorHandler(widgets_get));
router.post("/remove", auth.required, errorHandler(widget_delete));
router.post("/edit", auth.required, errorHandler(widget_edit));
export default router;
