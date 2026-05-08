import { z } from "zod";

export const createMovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    overview: z.string().optional(),
    releaseYear: z
        .number()
        .int("Release year must be an integer")
        .min(1888, "Release year must be after 1888")
        .max(new Date().getFullYear(), "Release year cannot be in the future")
        .optional(),
    genres: z.array(z.string()).optional(),
    runtime: z
        .number()
        .int("Runtime must be an integer")
        .positive("Runtime must be a positive number")
        .optional(),
    posterUrl: z.string().url("Poster URL must be a valid URL").optional(),
});
