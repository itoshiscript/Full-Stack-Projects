import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const body = req.body;
    const [name, email, password] = [body.name, body.email, body.password];

    // Check if users already exists
    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });

    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    //Generate JWT token
    const token = generateToken(user.id, res);

    // Send response
    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        },
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if users email exists
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid email and Password" });
    }

    //Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email and password" });
    }

    // Generate JWT token
    const token = generateToken(user.id, res);

    // If everything is valid, send response
    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            },
            token,
        },
    });
};

export const logout = async (req, res) => {
    // Clear the JWT cookie
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};
