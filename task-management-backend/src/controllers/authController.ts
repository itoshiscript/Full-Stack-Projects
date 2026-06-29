import { Request, Response } from "express";
import {findUserEmail, register} from "../models/auth";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/generateToken";

export const storeUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const existingUser = await findUserEmail(email);

        if(existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            })
        }

        if(!email || !password) {
            return res.status(409).json({
                status: "error",
                message: "Please provide email and password",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await register({email, password: hashedPassword});

        if(!result) {
            return res.status(500).json({
                status: "error",
                message: "Failed to create user",
            })
        }

        const token = generateToken(result.id, res)

        return res.status(201).json({
            status: "success",
            data: result,
            token,
        })

    }catch (error : unknown) {
        if(error instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            })
        }
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please provide email and password",
            })
        }

        const user = await findUserEmail(email);

        if(!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            })
        }

        const token = generateToken(user.id, res)

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
        })

    }catch (error : unknown) {
        if(error instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            })
        }
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

