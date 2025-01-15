import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import QuestionType, { Choice } from "../../questions/ViewQuestion/QuestionType";

interface QuestionCardProps {
    questionId: string;
    question: QuestionType;
    index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, question, index }) => {

    const correctOption = question.options.find(option => option.isCorrect);

    const formControlRadio = (option: Choice) => (
        <Radio
            disabled={true}
            sx={{ '&.Mui-checked .MuiSvgIcon-root': { color: option.isCorrect ? 'green' : 'inherit' } }}
        />
    );

    const formControlLabel = ( option: Choice ) => (
        <Typography sx={{ color: option.isCorrect ? 'green': 'inherit', fontWeight: 'bold' }}>
            {option.text}
        </Typography>
    );

    return (
        <div className="w-[700px] mb-3">
            <Card variant="outlined" sx={{ padding: 3 }}>
                <CardContent sx={{ textAlign: 'left' }}> 
                    <Typography variant="h5" component="div" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                        Question {index}
                    </Typography>
                </CardContent>
                <Typography variant="h5" component="div" className="pl-4 pb-6 whitespace-normal overflow-visible text-left">
                    {question.title}
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-labelledby={`question-options-group-${index}`}
                        name={`question-options-group-${index}`}
                        value={ correctOption?.text}
                        sx={{ pr: 70 }}
                    >
                        {question.options.map((option, idx) => (
                        <FormControlLabel
                            key={idx}
                            value={option.text}
                            control={formControlRadio(option)}
                            label={formControlLabel(option)}
                        />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
        </div>
    );
};

export default QuestionCard;