import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getEventsStudentsJoined = (id: string, token: string) =>
    axios.get(`http://localhost:8080/event/${id}/joined`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetEventsStudentsJoined = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["eventsJoined"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getEventsStudentsJoined(id, token);
        },
    });
};