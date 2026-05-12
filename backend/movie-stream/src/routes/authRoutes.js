import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { registerSchema } from "../validator/registerValidator.js";
import { ro } from "zod/v4/locales";

const router = express.Router();

router.post("/", validateRequest(registerSchema), register);
router.post("/login", login);

export default router;
