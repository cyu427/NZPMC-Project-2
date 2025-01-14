import { z } from "zod";

export const createEventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    dateTime: z.string().datetime("Date and time is required").refine(
        (dateTimeString) => {
            const inputDate = new Date(dateTimeString);
            const currentDate = new Date();
            return inputDate > currentDate;
        },
        { message: "Event date and time must be in the future" }
    ),
    location: z.string().min(1, "Location is required"),
    cost : z.number().min(0, "Number must be positive 0 or larger").transform((val) => {
        // Ensure the number has two decimal places
        return parseFloat(val.toFixed(2));
    }),
    description: z.string({ required_error: "Message is required" }).min(1, { message: "Required" }).trim(),
});

export const editEventSchema = createEventSchema.extend({
    id: z.string(),
});

export type CreateEventSchemaFormData = z.infer<typeof createEventSchema>
export type EditEventSchemaFormData = z.infer<typeof editEventSchema>