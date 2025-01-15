import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

interface AddCompetitionToEventParams {
    competitionId: string;
    eventId: string;
}

const addCompetitionToEvent = ({ competitionId, eventId }: AddCompetitionToEventParams, token: string) =>
    axios.put(`http://localhost:8080/admin/competition/addCompetitionToEvent/${competitionId}/${eventId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useAddCompetitionToEvent = () => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (params: AddCompetitionToEventParams) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return addCompetitionToEvent(params, token)
        },
        onSuccess: () => {
            // For example, refetch a list of questions if needed
        },
        onError: (error) => {
            console.error("Error adding competition to event", error);
        },
    });
};
