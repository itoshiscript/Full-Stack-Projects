import express from "express";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { registerSchema } from "../validations/userValidate.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", login);

export default router;
