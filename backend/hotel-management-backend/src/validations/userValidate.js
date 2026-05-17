import { z } from "zod";

export const registerSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters long"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Must contain uppercase letter")
        .regex(/[a-z]/, "Must contain lowercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[@$!%*?&]/, "Must contain a special character"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits long"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
});
