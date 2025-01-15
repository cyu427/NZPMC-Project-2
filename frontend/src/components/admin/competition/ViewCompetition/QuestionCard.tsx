import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import QuestionType from "../../questions/ViewQuestion/QuestionType";

interface QuestionCardProps {
    questionId: string;
    question: QuestionType;
    index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, question, index }) => {

    const correctOption = question.options.find(option => option.isCorrect);

    const formControlRadio = (
        <Radio
            disabled={true}
            sx={{ '&.Mui-checked .MuiSvgIcon-root': { color: 'green' } }}
        />
    );

    const formControlLabel = ( optionText: string ) => (
        <Typography sx={{ color: 'green', fontWeight: 'bold' }}>
            {optionText}
        </Typography>
    );

    return (
        <div className="w-[700px] mb-3">
            <Card variant="outlined" sx={{ padding: 3 }}>
                <CardContent> 
                    <Typography variant="h5" component="div" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                        Question {index}
                    </Typography>
                </CardContent>
                <Typography variant="h5" component="div" sx={{ marginBottom: 2, whiteSpace: 'normal', overflow: 'visible' }}>
                    {question.question}
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-labelledby={`question-options-group-${index}`}
                        name={`question-options-group-${index}`}
                        value={ correctOption?.text}
                    >
                        {question.options.map((option, idx) => (
                        <FormControlLabel
                            key={idx}
                            value={option.text}
                            control={formControlRadio}
                            label={formControlLabel(option.text)}
                        />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
        </div>
    );
};

export default QuestionCard;