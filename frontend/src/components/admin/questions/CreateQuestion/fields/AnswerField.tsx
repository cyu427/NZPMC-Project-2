import { Control, Controller } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { CreateQuestionFormData } from "../../../../../schema/question/createQuestionSchema";
import FormFieldNames from "./FormFieldNames";

const AnswerField: React.FC<{
    control: Control<CreateQuestionFormData>;
    answerName: FormFieldNames;
}> = ({ control, answerName: answerName }) => (
    <Controller
        name={answerName}
        control={control}
        defaultValue={false}
        render={({ field }) => (
            <Select
                {...field}
                value={field.value ? 'Yes' : 'No'}
                onChange={(e) => field.onChange(e.target.value === 'Yes')}
                sx={{width: '25%', marginLeft: '10px', height: '56px'}}
            >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
            </Select>
        )}
  />
)

export default AnswerField;