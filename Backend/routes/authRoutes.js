import express from "express";
import { login, signup } from "../controller/authController.js";
import { signupRules, validate } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/signup", signupRules, validate, signup);
router.post("/signin", signupRules, validate, login);

export default router;
