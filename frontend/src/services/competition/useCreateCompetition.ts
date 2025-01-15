import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";
import { CompetitionSchemaFormData } from "../../schema/competition/createCompetitionSchema";

const createCompetition = (competition: CompetitionSchemaFormData, token: string) =>
    axios.post('http://localhost:8080/admin/competition', competition, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useCreateCompetition = () => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (competition: CompetitionSchemaFormData) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return createCompetition(competition, token);
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
