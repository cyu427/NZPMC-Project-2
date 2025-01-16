import { z } from "zod";

export const createQuestionSchema = z.object({
    question: z.string().min(1, "Please enter question"),
    option1: z.string().min(1, "Please enter option 1"),
    option2: z.string().min(1, "Please enter option 2"),
    option3: z.string().min(1, "Please enter option 3"),
    option4: z.string().min(1, "Please enter option 4"),
    answer1: z.boolean(),
    answer2: z.boolean(),
    answer3: z.boolean(),
    answer4: z.boolean(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    topic: z.enum(["MECHANICS", "WAVES", "ALGEBRA", "GEOMETRY"]),
})

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
