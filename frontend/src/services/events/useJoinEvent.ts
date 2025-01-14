import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const joinEvent = ({ eventId, userId }: { eventId: string; userId: string }, token: string) => 
    axios.put(`http://localhost:8080/event/${userId}/join/${eventId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useJoinEvent = () => {
    const { token } = useAuth();
    return useMutation({
        mutationFn: ({ eventId, userId }: { eventId: string; userId: string }) => joinEvent({ eventId, userId }, token!),
        onSuccess: () => {
            // For example, refetch a list of events if needed
        },
        onError: (error) => {
            console.error("Error joining event", error);
        },
    });
};
