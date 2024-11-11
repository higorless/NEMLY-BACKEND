import { Router } from "express";
import {
  createUser,
  deleteUser,
  addFriend,
} from "../controller/user.controller.js";
import { userValidateLogin } from "../controller/sessions.controller.js";
import { verifyToken } from "../middlewares/ensureAuthenticated.js";

const router = Router();

router.post("/register", createUser);
router.post("/validation", userValidateLogin);
router.post("/add", verifyToken, addFriend);
// verifyToken => MIDDLEWARE

router.delete("/delete", deleteUser);

export default router;
