import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getEventsStudentNotJoined = (id: string, token: string) =>
    axios.get(`http://localhost:8080/event/${id}/not-joined`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetEventsStudentNotJoined = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["eventsNotJoined"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getEventsStudentNotJoined(id, token);
        },
    });
};