import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getCompetition = (id: string, token: string) =>
    axios.get(`http://localhost:8080/admin/competition/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetCompetition = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["competition"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getCompetition(id, token);
        },
    });
};
