import { Router } from "express";
import { userValidateLogin } from "../controller/sessions.controller.js";

const router = Router();

router.post("/", userValidateLogin);

export default router;
