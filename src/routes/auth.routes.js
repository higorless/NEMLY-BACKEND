import { Router } from "express";
import {
  verifyToken,
  userValidateLogin,
  userLogged,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/", verifyToken, userValidateLogin);
router.get("/logged", userLogged);

export default router;
