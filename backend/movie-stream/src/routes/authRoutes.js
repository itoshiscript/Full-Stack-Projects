import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { registerSchema } from "../validator/registerValidator.js";
import { ro } from "zod/v4/locales";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", validateRequest(registerSchema), register);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
