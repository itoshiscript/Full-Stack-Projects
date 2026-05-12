import express from "express";
import { getAllMovies, getMovieById } from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes in this router

router.get("/", getAllMovies);
router.get("/:id", getMovieById);

export default router;
