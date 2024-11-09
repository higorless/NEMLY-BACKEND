import { Router } from "express";
import mongoose from "mongoose";
import { createUser, deleteUser } from "../controller/product.controller.js";
import { userValidateLogin } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/validation", userValidateLogin);
router.delete("/delete", deleteUser);

export default router;
