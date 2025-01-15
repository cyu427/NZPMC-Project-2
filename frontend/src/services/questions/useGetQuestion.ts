import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getQuestion = (id: string, token: string) =>
    axios.get(`http://localhost:8080/admin/question/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetQuestion = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["question"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getQuestion(id, token);
        },
    });
};
