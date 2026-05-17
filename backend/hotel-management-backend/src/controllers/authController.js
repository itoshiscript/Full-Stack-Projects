import { findUserByEmail, registerUser } from "../models/authModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password,
            phone,
            address,
        } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await registerUser(
            firstName,
            middleName,
            lastName,
            email,
            hashedPassword,
            phone,
            address,
        );

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
                status: true,
                message: "User registered successfully",
                token,
            },
        });
    } catch (err) {
        res.status(500).json({
            data: {
                status: "error",
                message: err.message,
            },
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const token = generateToken(user.id, res);

        res.json({
            data: {
                status: true,
                message: "Login successful",
                token,
            },
        });
    } catch (err) {
        res.status(500).json({
            data: {
                status: "error",
                message: "Internal server error",
            },
        });
    }
};
