import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

interface RemoveCompetitionToEventParams {
    competitionId: string;
    eventId: string;
}

const removeCompetitionFromEvent = ({competitionId, eventId}: RemoveCompetitionToEventParams, token: string) =>
    axios.delete(`http://localhost:8080/admin/competition/removeCompetitionFromEvent/${competitionId}/${eventId}`, { 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useRemoveCompetitionFromEvent = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (params: RemoveCompetitionToEventParams) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return removeCompetitionFromEvent(params, token);
            },
            // Optional: You can add `onSuccess` or `onError` to handle specific side effects
            onSuccess: () => {
                // For example, refetch a list of questions if needed
            },
            onError: (error) => {
                console.error("Error deleting question", error);
            },
        });
};