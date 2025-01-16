import axios from "axios";
import useAuth from "../../states/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { QuestionPayload } from "./utils/createQuestionMapping";

interface updateQuestionParams {
    question: QuestionPayload;
    questionId: string;
}

const updateQuestion = ({question, questionId}: updateQuestionParams, token: string) =>
    axios.put(`http://localhost:8080/admin/question/${questionId}`, question, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data.event);

export const useUpdateQuestion = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (params: updateQuestionParams) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return updateQuestion(params, token);
            },
            // Optional: You can add `onSuccess` or `onError` to handle specific side effects
            onSuccess: () => {
                // For example, refetch a list of questions if needed
            },
            onError: (error) => {
                console.error("Error updating question", error);
            },
        });
}