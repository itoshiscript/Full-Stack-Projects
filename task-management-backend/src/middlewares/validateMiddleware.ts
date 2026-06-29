import { Request, Response, NextFunction } from "express";
import {z} from "zod";


export const validateRequest = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = Object.values(result.error.flatten().fieldErrors).flat();

            return res.status(400).json({
                status: "error",
                errors,
            });
        }

        req.body = result.data;

        next();
    };
};