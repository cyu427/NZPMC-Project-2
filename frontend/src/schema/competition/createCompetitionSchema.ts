import { z } from "zod";

export const createCompetitionSchema = z.object({
    title: z.string().min(1, "Competition name is required"),
});

export type CreateCompetitionSchemaFormData = z.infer<typeof createCompetitionSchema>