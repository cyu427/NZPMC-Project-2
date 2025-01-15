import { useMutation, } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../states/attempt/AttemptContext";
import useAuth from "../../states/auth/useAuth";

interface SubmitAttemptParams {
    userId: string;
    competitionId: string;
    attempt: Record<string, Option>;
  }

const submitAttempt = ({userId, competitionId, attempt} : SubmitAttemptParams, token: string) =>
    axios.post(`http://localhost:8080/attempt/${userId}/${competitionId}`, attempt, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useSubmitAttempt = () => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (params: SubmitAttemptParams) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return submitAttempt(params, token)
        },
        // Optional: You can add `onSuccess` or `onError` to handle specific side effects
        onSuccess: () => {
            // For example, refetch a list of questions if needed
        },
        onError: (error) => {
            console.error("Error submitting attempt", error);
        },
    });
};
