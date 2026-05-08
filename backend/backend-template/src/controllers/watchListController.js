import { prisma } from "../config/db.js";

export const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    // Check if movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    // Check if already in watchlist
    const existingEntry = await prisma.watchListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            },
        },
    });

    if (existingEntry) {
        return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const watchListItem = await prisma.watchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });

    res.status(201).json({
        data: {
            watchListItem,
        },
    });
};
