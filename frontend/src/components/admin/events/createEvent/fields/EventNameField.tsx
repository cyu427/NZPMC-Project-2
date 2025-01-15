import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateEventSchemaFormData } from "../../../../../schema/event/createEventSchema";
import { TextField } from "@mui/material";

const EventNameField: React.FC<{
    control: Control<CreateEventSchemaFormData>;
    errors: FieldErrors<CreateEventSchemaFormData>;
}> = ({ control, errors }) => (
    <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <TextField
                {...field}
                label="Event Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
            />
        )}
    />
)

export default EventNameField;