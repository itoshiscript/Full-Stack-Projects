import jwt from "jsonwebtoken";
import {Response} from "express";



export const generateToken = (userId : number, res : Response) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({userId}, secret, {
        expiresIn: "7d",
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return token;
};