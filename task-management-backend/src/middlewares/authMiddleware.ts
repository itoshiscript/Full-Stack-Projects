import jwt from "jsonwebtoken";
import {prisma} from "../lib/prisma";
import {Request, Response, NextFunction} from "express";

interface JwtPayload {
    userId: number;
}

export const protect = async (req : Request, res : Response, next: NextFunction) => {
    console.log("Reach Auth Middleware");

    // Check for token in header or cookies
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
    }

    try {
        // Verify token
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jwt.verify(token, secret) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true }
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
};