import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

interface RemoveQuestionFromCompetitionParams {
    competitionId: string;
    questionId: string;
}

const removeQuestionFromCompetition = ({competitionId, questionId }: RemoveQuestionFromCompetitionParams, token: string) =>
    axios.delete(`http://localhost:8080/admin/competition/removeQuestionFromCompetition/${competitionId}/${questionId}`, { 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useRemoveQuestionFromCompetition = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (params: RemoveQuestionFromCompetitionParams) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return removeQuestionFromCompetition(params, token);
            },
            // Optional: You can add `onSuccess` or `onError` to handle specific side effects
            onSuccess: () => {
                // For example, refetch a list of questions if needed
            },
            onError: (error) => {
                console.error("Error deleting question from competition", error);
            },
        });
};