import {
    findUserByEmail,
    findUsername,
    registerUser,
} from "../models/authModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const existingUsername = await findUsername(username);

        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await registerUser(username, email, hashedPassword);

        if (!result) {
            return res.status(500).json({
                data: {
                    status: "error",
                    message: "Failed to register user",
                },
            });
        }

        const token = generateToken(result.insertId, res);

        res.status(201).json({
            data: {
                status: "success",
                message: "User registered successfully",
                token,
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user.id, res);

        res.json({
            data: {
                status: "success",
                message: "Logged in successfully",
                token,
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
