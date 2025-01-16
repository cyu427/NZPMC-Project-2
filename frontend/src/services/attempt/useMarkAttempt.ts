import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const markAttempt = (id: string, token : string) =>
    axios.get(`http://localhost:8080/admin/attempt/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useMarkAttempt = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["markedAttempts"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return markAttempt(id, token);
        }
    });
};
