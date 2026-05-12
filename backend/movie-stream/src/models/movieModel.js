import { conn } from "../config/db.js";

export const getAllMoviesModel = async () => {
    const sql = "SELECT * FROM movies";

    const [rows] = await conn.query(sql);

    return rows;
};

export const getMovieByIdModel = async (id) => {
    const sql = "SELECT * FROM movies WHERE id = ?";

    const [rows] = await conn.query(sql, [id]);

    return rows[0];
};
