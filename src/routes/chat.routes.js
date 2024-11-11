import { Router } from "express";
import { verifyToken } from "../middlewares/ensureAuthenticated.js";

const router = Router();

router.post("/");
