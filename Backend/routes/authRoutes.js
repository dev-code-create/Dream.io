import express from "express";
import { login, signup } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);

export default router;
