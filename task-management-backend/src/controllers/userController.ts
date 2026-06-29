import {Request, Response} from "express";
import {getAllUsers} from "../models/userModel";

export const index = async (req : Request, res : Response) => {
    try {
        const users  = await getAllUsers();

        return res.status(200).json({
                status: "success",
                users,
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