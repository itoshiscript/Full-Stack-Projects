import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getAllMovies,
    getMovieById,
    addMovie,
} from "../controllers/movieController.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { createMovieSchema } from "../validators/movieValidator.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", validateRequest(createMovieSchema), addMovie);

export default router;
