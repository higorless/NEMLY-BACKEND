import { Router } from "express";
import { verifyToken } from "../middlewares/ensureAuthenticated.js";
import { getMessages } from "../controller/chats.controller.js";

const router = Router();

router.get("/:id", verifyToken, getMessages);

export default router;
