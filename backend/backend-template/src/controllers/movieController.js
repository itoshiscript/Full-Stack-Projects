import { prisma } from "../config/db.js";

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.status(200).json({
            status: "success",
            data: {
                movies,
            },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "An error occurred while fetching movies" });
    }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json({
            status: "success",
            data: {
                movie,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: "Movie not found" });
    }
};

// Add Movie
export const addMovie = async (req, res) => {
    const { title, overview, releaseYear, genres, runtime, posterUrl } =
        req.body;

    try {
        const newMovie = await prisma.movie.create({
            data: {
                title,
                overview,
                releaseYear,
                genres,
                runtime,
                posterUrl,
                createdBy: req.user.id,
            },
        });

        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "An error occurred while adding the movie" });
    }
};

// Update Movie
export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, overview, releaseYear, genres, runtime, posterUrl } =
        req.body;

    try {
        const existingMovie = await prisma.movie.findUnique({
            where: { id },
        });

        if (!existingMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        if (existingMovie.createdBy !== req.user.id) {
            return res
                .status(403)
                .json({ error: "You are not authorized to update this movie" });
        }

        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: {
                title,
                overview,
                releaseYear,
                genres,
                runtime,
                posterUrl,
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                movie: updatedMovie,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "An error occurred while updating the movie" });
    }
};

// Delete Movie
export const deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const existingMovie = await prisma.movie.findUnique({
            where: { id },
        });

        if (!existingMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        if (existingMovie.createdBy !== req.user.id) {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this movie" });
        }

        await prisma.movie.delete({
            where: { id },
        });

        res.status(200).json({
            data: {
                status: "success",
                message: "Movie deleted successfully",
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "An error occurred while deleting the movie" });
    }
};
