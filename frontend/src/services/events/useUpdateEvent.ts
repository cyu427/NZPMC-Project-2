import axios from "axios";
import { CreateEventSchemaFormData } from "../../schema/event/createEventSchema";
import useAuth from "../../states/auth/useAuth";
import { useMutation } from "@tanstack/react-query";

interface updateEventParams {
    event: CreateEventSchemaFormData;
    eventId: string;
}

const updateEvent = ({event, eventId}: updateEventParams, token: string) =>
    axios.put(`http://localhost:8080/admin/event/${eventId}`, event, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data.event);

export const useUpdateEvent = () => {
    const { token } = useAuth();

    return useMutation({
            mutationFn: (params: updateEventParams) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return updateEvent(params, token);
            },
            // Optional: You can add `onSuccess` or `onError` to handle specific side effects
            onSuccess: () => {
                // For example, refetch a list of questions if needed
            },
            onError: (error) => {
                console.error("Error updating question", error);
            },
        });
}