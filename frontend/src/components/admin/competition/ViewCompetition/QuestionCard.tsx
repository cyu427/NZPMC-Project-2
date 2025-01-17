import { Card, CardContent, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import QuestionType, { Choice } from "../../questions/ViewQuestion/QuestionType";
import useAuth from "../../../../states/auth/useAuth";
import Role from "../../../../utils/Role";
import { ChangeEvent } from "react";
import { useAttempt } from "../../../../states/attempt/useAttempt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRemoveQuestionFromCompetition } from "../../../../services/competition/useRemoveQuestionFromCompetition";

interface QuestionCardProps {
    questionId: string;
    question: QuestionType;
    index: number;
    competitionId?: string;
    refreshCompetition?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, question, index, competitionId, refreshCompetition }) => {
    const { role } = useAuth();
    const { answers, setAnswer } = useAttempt();

    const { mutate: removeQuestionFromCompetition } = useRemoveQuestionFromCompetition();

    const onDelete = (questionId: string) => {
        if (!competitionId) {
            console.error("Competition ID is required to delete a question.");
            return;
        }

        if (!refreshCompetition) {
            console.error("Refresh competition function is required to delete a question.");
            return;
        }

        removeQuestionFromCompetition({competitionId, questionId}, {
            onSuccess: () => {
                refreshCompetition();
            },
        });
    };
    
    const selectedAnswer = answers[questionId];
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>, newValue: string) => {
        if (role !== Role.ADMIN) {
            const option = question.options.find(opt => opt.text === newValue);
            
            if (option) {
                setAnswer(questionId, option);
            }
        }
    };

    const correctOption = question.options.find(option => option.isCorrect);

    const formControlRadio = (option: Choice) => (
        <Radio
            disabled={role === Role.ADMIN}
            sx={{ '&.Mui-checked .MuiSvgIcon-root': { color: role === Role.ADMIN && option.isCorrect ? 'green' : 'inherit' } }}
        />
    );

    const formControlLabel = ( option: Choice ) => (
        <Typography sx={{ color: role === Role.ADMIN && option.isCorrect ? 'green': 'inherit', fontWeight: role === Role.ADMIN && option.isCorrect ? 'bold' : 'regular' }}>
            {option.text}
        </Typography>
    );

    return (
        <div className="w-[700px] mb-3">
            <Card variant="outlined" sx={{ padding: 3 }}>
                <CardContent sx={{ textAlign: 'left' }}> 
                    <div className="flex justify-between">
                        <Typography variant="h5" component="div" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                            Question {index}
                        </Typography>
                        <IconButton
                        onClick={() => onDelete(questionId)}
                            sx={{ color: 'red', marginBottom: 2, padding: 0 }}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </CardContent>
                <Typography variant="h5" component="div" className="pl-4 pb-6 whitespace-normal overflow-visible text-left">
                    {question.title}
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-labelledby={`question-options-group-${index}`}
                        name={`question-options-group-${index}`}
                        value={ role === Role.ADMIN ? correctOption?.text: selectedAnswer?.text || '' }
                        onChange={handleOptionChange}
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