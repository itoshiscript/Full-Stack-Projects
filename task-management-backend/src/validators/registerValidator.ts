import {z} from 'zod';

export const registerValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});