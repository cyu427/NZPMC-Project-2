import { Control, Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CreateQuestionFormData } from "../../../../../schema/question/createQuestionSchema";
import DifficultyType from "./fieldTypes/DifficultyType";

const DifficultyField: React.FC<{
    control: Control<CreateQuestionFormData>;
}> = ({ control }) => (
    <Controller
        name="difficulty"
        control={control}
        defaultValue={DifficultyType.EASY}
        render={({ field }) => (
            <FormControl sx={{width: '50%', height: '56px'}}>
                <InputLabel id="difficuly-label" >Difficulty</InputLabel>
                <Select
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    labelId="difficuly-label"
                    label="Difficulty"
                    sx={{ marginLeft: '10px', height: '56px'}}
                >
                    <MenuItem value={DifficultyType.EASY}>Easy</MenuItem>
                    <MenuItem value={DifficultyType.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={DifficultyType.HARD}>Hard</MenuItem>
                </Select>
            </FormControl>
        )}
  />
)

export default DifficultyField;