import { getAllMoviesModel, getMovieByIdModel } from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
    try {
        const movies = await getAllMoviesModel();

        res.status(200).json({
            data: {
                status: "success",
                results: movies.length,
                movies,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: "error",
                message: error.message,
            },
        });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await getMovieByIdModel(id);

        if (!movie) {
            return res.status(404).json({
                data: {
                    status: "error",
                    message: "Movie not found",
                },
            });
        }

        res.status(200).json({
            data: {
                status: "success",
                movie,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: "error",
                message: error.message,
            },
        });
    }
};
