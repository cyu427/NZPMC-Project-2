import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { CreateQuestionFormData } from "../../../../../schema/question/createQuestionSchema";

const QuestionField: React.FC<{
    control: Control<CreateQuestionFormData>;
    errors: FieldErrors<CreateQuestionFormData>;
    defaultValue?: string;
}> = ({ control, errors, defaultValue = "" }) => (
    <Controller
        name="question"
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <TextField
                {...field}
                label="Question"
                fullWidth
                margin="normal"
                error={!!errors.question}
                helperText={errors.question?.message}
                multiline
                rows={3}
                sx={{ marginBottom: '20px', height: 'auto' }}
            />
        )}
    />
)

export default QuestionField;