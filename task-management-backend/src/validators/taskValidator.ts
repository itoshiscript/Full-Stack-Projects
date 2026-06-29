import {z} from 'zod'

export const taskValidator = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
    description: z.string().max(1000).optional(),
    categoryId: z.coerce.number().optional(),
});

export const updateTaskValidator = taskValidator.partial().extend({
    completed: z.boolean().optional(),
});
