import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const deleteQuestion = (id: string, token: string) =>
    axios.delete(`http://localhost:8080/admin/question/${id}`, { 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const useDeleteQuestion = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (id: string) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return deleteQuestion(id, token);
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