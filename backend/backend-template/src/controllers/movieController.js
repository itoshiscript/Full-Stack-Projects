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
