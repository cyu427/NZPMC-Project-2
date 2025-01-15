import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import { QuestionPayload } from "./utils/createQuestionMapping";
import useAuth from "../../states/auth/useAuth";

const createQuestion = (question: QuestionPayload, token: string) =>
    axios.post('http://localhost:8080/admin/question', question, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useCreateQuestion = () => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (question: QuestionPayload) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return createQuestion(question, token);
        },
        // Optional: You can add `onSuccess` or `onError` to handle specific side effects
        onSuccess: () => {
            // For example, refetch a list of questions if needed
        },
        onError: (error) => {
            console.error("Error creating question", error);
        },
    });
};
