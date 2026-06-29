import express from "express";
import {loginUser, storeUser} from "../controllers/authController";
import {validateRequest} from "../middlewares/validateMiddleware";
import {registerValidator} from "../validators/registerValidator";

const router = express.Router();

router.post("/register", validateRequest(registerValidator) ,storeUser);
router.post("/login", loginUser);

export default router;