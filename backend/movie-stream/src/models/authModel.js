import { conn } from "../config/db.js";

export const registerUser = async (username, email, password) => {
    const query =
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

    const [result] = await conn.execute(query, [username, email, password]);

    return result;
};

export const findUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";

    const [rows] = await conn.execute(query, [email]);

    return rows[0];
};

export const findUsername = async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";

    const [rows] = await conn.execute(query, [username]);

    return rows[0];
};
