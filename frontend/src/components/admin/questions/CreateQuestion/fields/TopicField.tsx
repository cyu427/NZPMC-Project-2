import { Control, Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CreateQuestionFormData } from "../../../../../schema/question/createQuestionSchema";
import TopicType from "./fieldTypes/TopicType";

const TopicField: React.FC<{
    control: Control<CreateQuestionFormData>;
}> = ({ control }) => (
    <Controller
        name="topic"
        control={control}
        defaultValue={TopicType.MECHANICS}
        render={({ field }) => (
            <FormControl sx={{width: '50%', height: '56px'}}>
                <InputLabel id="topic-label" >Topic</InputLabel>
                <Select
                    {...field}
                    value={field.value}
                    labelId="topic-label"
                    label="Topic"
                    onChange={(e) => field.onChange(e.target.value)}
                >
                    <MenuItem value={TopicType.MECHANICS}>Mechanics</MenuItem>
                    <MenuItem value={TopicType.WAVES}>Waves</MenuItem>
                    <MenuItem value={TopicType.ALGEBRA}>Algebra</MenuItem>
                    <MenuItem value={TopicType.GEOMETRY}>Geometry</MenuItem>
                </Select>
            </FormControl>
        )}
  />
)

export default TopicField;