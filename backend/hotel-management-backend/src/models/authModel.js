import { conn } from "../database/config.js";

export const registerUser = async (
    firstName,
    middleName,
    lastName,
    email,
    password,
    phone,
    address,
) => {
    const query =
        "INSERT INTO users (first_name, middle_name, last_name, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const [result] = await conn.execute(query, [
        firstName,
        middleName,
        lastName,
        email,
        password,
        phone,
        address,
    ]);

    return result;
};

export const findUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";

    const [rows] = await conn.execute(query, [email]);

    return rows[0];
};
