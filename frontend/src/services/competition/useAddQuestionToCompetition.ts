import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

interface AddQuestionToCompetitionParams {
    competitionId: string;
    questionId: string;
}

const addQuestionToCompetition = ({ competitionId, questionId }: AddQuestionToCompetitionParams, token: string) =>
    axios.put(`http://localhost:8080/admin/competition/addQuestionToCompetition/${competitionId}/${questionId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useAddQuestionToCompetition = () => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (params: AddQuestionToCompetitionParams) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return addQuestionToCompetition(params, token)
        },
        onSuccess: () => {
            // For example, refetch a list of questions if needed
        },
        onError: (error) => {
            console.error("Error adding question to competition", error);
        },
    });
};
