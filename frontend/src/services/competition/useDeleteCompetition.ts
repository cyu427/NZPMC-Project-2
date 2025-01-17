import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const deleteCompetition = (competitionId: string, token: string) =>
    axios.delete(`http://localhost:8080/admin/competition/deleteCompetition/${competitionId}`, { 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useDeleteCompetition = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (competitionId: string) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return deleteCompetition(competitionId, token);
            },
            // Optional: You can add `onSuccess` or `onError` to handle specific side effects
            onSuccess: () => {
                // For example, refetch a list of questions if needed
            },
            onError: (error) => {
                console.error("Error deleting competition", error);
            },
        });
};