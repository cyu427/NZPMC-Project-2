import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { CreateCompetitionSchemaFormData } from "../../../../../schema/competition/createCompetitionSchema";

const TitleField: React.FC<{
    control: Control<CreateCompetitionSchemaFormData>;
    errors: FieldErrors<CreateCompetitionSchemaFormData>;
}> = ({ control, errors }) => (
    <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                multiline
                rows={3}
                sx={{ marginBottom: '20px', height: 'auto' }}
            />
        )}
    />
)

export default TitleField;