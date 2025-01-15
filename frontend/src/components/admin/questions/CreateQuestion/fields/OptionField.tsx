import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormHelperText, TextField } from "@mui/material";
import { CreateQuestionFormData } from "../../../../../schema/question/createQuestionSchema";
import FormFieldNames from "./FormFieldNames";

const OptionField: React.FC<{
    control: Control<CreateQuestionFormData>;
    errors: FieldErrors<CreateQuestionFormData>;
    optionName: FormFieldNames;
    index: number;
}> = ({ control, errors, optionName, index }) => (
    <Controller
        name={optionName}
        control={control}
        defaultValue=""
        render={({ field }) => (
            <div style={{ width: '70%', height: '56px' }}>  
                <TextField
                    {...field}
                    label={`Option ${index + 1}`}
                    error={!!errors[optionName]}
                    fullWidth
                />
                {errors[optionName] && (
                    <FormHelperText error>{errors[optionName]?.message}</FormHelperText>
                )}
            </div>
        )}
    />
)

export default OptionField;