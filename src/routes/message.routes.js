import express from "express";
import { sendMessage } from "../controller/messages.controller.js";
import { verifyToken } from "../middlewares/ensureAuthenticated.js";

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage);

export default router;
