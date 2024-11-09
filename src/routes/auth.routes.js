import { Router } from "express";
import {
  verifyToken,
  userValidateLogin,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/", userValidateLogin);

export default router;
