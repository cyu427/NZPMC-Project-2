import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getAllCompetition = (token : string) =>
    axios.get('http://localhost:8080/admin/competition', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetAllCompetition = () => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["allCompetitions"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getAllCompetition(token);
        }
    });
};
