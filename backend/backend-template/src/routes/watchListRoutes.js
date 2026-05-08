import express from "express";
import { addToWatchList } from "../controllers/watchListController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { addToWatchListSchema } from "../validators/watchListValidators.js";

const router = express.Router();

//Run Middleware
router.use(protect);

router.post("/", validateRequest(addToWatchListSchema), addToWatchList);

export default router;
