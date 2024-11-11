import express from "express";
import { sendMessage } from "../controller/messages.controller";

const router = express.Router();

router.post("/send/:id", sendMessage);

export default router;
