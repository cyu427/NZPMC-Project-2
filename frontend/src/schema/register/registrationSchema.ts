import { z } from "zod";

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Please enter your first name"),
    lastName: z.string().min(1, "Please enter your last name"),
});

export const educationSchema = z.object({
    homeSchooled: z.boolean(),
    school: z
        .string()
        .min(2, "School name must be at least 2 characters")
        .optional(),
}).refine((data) => {
    if (!data.homeSchooled && !data.school) {
        return false;
    }
    return true;
}, {
    path: ["school"],
});

export const accountSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const verificationSchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type EducationFormData = z.infer<typeof educationSchema>
export type AccountFormData = z.infer<typeof accountSchema>
export type VerificationFormData = z.infer<typeof verificationSchema>