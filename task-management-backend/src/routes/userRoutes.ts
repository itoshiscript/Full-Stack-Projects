import express from "express";
import {index} from "../controllers/userController";
import {protect} from "../middlewares/authMiddleware";

const router = express.Router();

router.use(protect);

router.get("/", index);


export default router;