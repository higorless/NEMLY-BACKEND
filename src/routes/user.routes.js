import { Router } from "express";
import {
  createUser,
  deleteUser,
  addFriend,
  userUpdateProfile,
} from "../controller/user.controller.js";
import { userValidateLogin } from "../controller/sessions.controller.js";
import { verifyToken } from "../middlewares/ensureAuthenticated.js";

const router = Router();

router.post("/register", createUser);
router.post("/edit", verifyToken, userUpdateProfile);
router.post("/add", verifyToken, addFriend);
router.post("/validation", userValidateLogin);
// verifyToken => MIDDLEWARE

router.delete("/delete", deleteUser);

export default router;
