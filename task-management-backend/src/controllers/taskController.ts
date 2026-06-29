import { Request, Response } from "express";
import {createTask, deleteTask, getAllTasks, getTaskById, updateTask} from "../models/taskModel";
import {number} from "zod";

export const store = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const {title, description, categoryId} = req.body;

        if(!userId) {
            return res.status(401).json({
                status: "error",
                message: "User not authenticated",
            })
        }

        const task = await createTask({title, description, categoryId, userId});

        return res.status(201).json({
            status: "success",
            data: task,
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

export const index = async (req: Request, res: Response) => {
    try {

        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({
                status: "error",
                message: "User not authenticated",
            })
        }

        const tasks = await getAllTasks(userId);

        return res.status(200).json({
            status: "success",
            data: tasks,
        })
    } catch (error : unknown) {
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

export const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({
                status: "error",
                message: "User not authenticated",
            })
        }

        const task = await getTaskById(id, userId);

        if(!task) {
            return res.status(404).json({
                status: "error",
                message: "Unauthorised to access this task",
            })
        }

        return res.status(200).json({
            status: "success",
            data: task,
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

export const update = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user?.id;

        if(!userId) {
            return res.status(404).json({
                status: "error",
                message: "Not Found",
            })
        }

        const getTask = await getTaskById(id, userId);

        if(!getTask) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorised to access this task",
            })
        }

        const updatedTask = await updateTask(id, req.body);

        return res.status(200).json({
            status: "success",
            data: updatedTask,
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

export const destroy = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user?.id;

        if(!userId) {
            return res.status(404).json({
                status: "error",
                message: "Not Found",
            })
        }

        const getTask = await getTaskById(id, userId);

        if(!getTask) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorised to access this task",
            })
        }

        const deletedTask = await deleteTask(id);

        return res.status(200).json({
            status: "success",
            data: deletedTask,
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