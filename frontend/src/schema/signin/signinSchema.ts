import { z } from "zod";

export const signInSchema = z.object({
    email: z.union([
        z.string().email("Invalid email address"), 
        z.string().min(1, "Email is required")
    ]),
    password: z.string().min(5, "Password must be at least 8 characters"),
})

export type SignInFormData = z.infer<typeof signInSchema>