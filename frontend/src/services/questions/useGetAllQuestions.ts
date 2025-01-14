import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getAllQuestions = (token : string) =>
    axios.get('http://localhost:8080/admin/question', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetAllQuestions = () => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["allQuestions"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getAllQuestions(token);
        }
    });
};
