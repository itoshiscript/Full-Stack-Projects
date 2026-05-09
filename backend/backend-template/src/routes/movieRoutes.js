import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movieController.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { createMovieSchema } from "../validators/movieValidator.js";
import { ro } from "zod/locales";

const router = express.Router();

router.use(protect);

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", validateRequest(createMovieSchema), addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
