import { Button, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetQuestion } from "../../../../services/questions/useGetQuestion";
import { useUpdateQuestion } from "../../../../services/questions/useUpdateQuestion";
import { CreateQuestionFormData, createQuestionSchema } from "../../../../schema/question/createQuestionSchema";
import QuestionField from "../CreateQuestion/fields/QuestionField";
import TopicField from "../CreateQuestion/fields/TopicField";
import DifficultyField from "../CreateQuestion/fields/DifficultyField";
import FormFieldNames from "../CreateQuestion/fields/FormFieldNames";
import OptionField from "../CreateQuestion/fields/OptionField";
import AnswerField from "../CreateQuestion/fields/AnswerField";
import { createQuestionMapping, mapToQuestionFormData } from "../../../../services/questions/utils/createQuestionMapping";

interface EditQuestionDialogContentProps {
    onClose : () => void; 
    questionId: string;
}

const EditEventDialogContent: React.FC<EditQuestionDialogContentProps> = ({ onClose, questionId }) => {
    const { data: questionData } = useGetQuestion(questionId);
    const { mutate: updateQuestion } = useUpdateQuestion();

    const fortmattedQuestionData = mapToQuestionFormData(questionData);

    const { control, handleSubmit, formState: { errors } } = useForm<CreateQuestionFormData>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: fortmattedQuestionData, // Prefill the form with existing event data
    });

    const onSubmit = (data: CreateQuestionFormData) => {
        const createdQuestion = createQuestionMapping(data);
        updateQuestion({ question: createdQuestion, questionId }, {
            onSuccess: () => {
                onClose();
                window.location.reload()
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
                Update Question
            </Button>
        </div>
    </form>
    );
};

export default EditEventDialogContent;