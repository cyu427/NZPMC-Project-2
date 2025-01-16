import { useForm } from "react-hook-form";
import { CreateQuestionFormData, createQuestionSchema } from "../../../../schema/question/createQuestionSchema";
import { useCreateQuestion } from "../../../../services/questions/useCreateQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuestionMapping } from "../../../../services/questions/utils/createQuestionMapping";
import { Button, DialogContent } from "@mui/material";
import QuestionField from "./fields/QuestionField";
import FormFieldNames from "./fields/FormFieldNames";
import OptionField from "./fields/OptionField";
import AnswerField from "./fields/AnswerField";
import DifficultyField from "./fields/DifficultyField";
import { Topic } from "@mui/icons-material";
import TopicField from "./fields/TopicField";

interface CreateQuestionDialogContentProps {
    onClose : () => void; 
    refetchAllQuestions: () => void;
}

const CreateQuestionDialogContent: React.FC<CreateQuestionDialogContentProps> = ({ onClose, refetchAllQuestions }) => {
    const { mutate: createQuestion } = useCreateQuestion();

    const { control, handleSubmit, formState: { errors } } = useForm<CreateQuestionFormData>({
        resolver: zodResolver(createQuestionSchema),
    });

    const onSubmit = (data: CreateQuestionFormData) => {
        const createdQuestion = createQuestionMapping(data);
        console.log(createdQuestion);
        createQuestion(createdQuestion, {
            onSuccess: () => {
                refetchAllQuestions();
                onClose();
            },
        });
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <div className="flex flex-col gap-1">
                    <QuestionField control={control} errors={errors} />
                    <div className="flex justify-between mb-8 items-start w-full">
                        <TopicField control={control} />
                        <DifficultyField control={control} />
                    </div>
                    
                    
                    {[...Array(4)].map((_, index) => {
                        const optionName: FormFieldNames = `option${index + 1}` as FormFieldNames;
                        const answerName: FormFieldNames = `answer${index + 1}` as FormFieldNames;

                        return (
                            <div key={index} className="flex justify-between mb-8 items-start">
                                <OptionField control={control} errors={errors} optionName={optionName} index={index} />
                                <AnswerField control={control} answerName={answerName} />
                            </div>   
                        );
                    })}
                </div>
            </DialogContent>
            <div className="flex justify-end p-3">
                <Button type="submit" variant="contained" color="primary">
                    Create Question
                </Button>
            </div>
        </form>
    );
};

export default CreateQuestionDialogContent;