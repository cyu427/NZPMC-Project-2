import axios from "axios";
import { CreateEventSchemaFormData } from "../../schema/event/createEventSchema";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../states/auth/useAuth";

const createEvent = (event: CreateEventSchemaFormData, token: string) => 
    axios.post("http://localhost:8080/admin/event", event, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    export const useCreateEvent = () => {
        const { token } = useAuth();
    
        return useMutation({
            mutationFn: (event: CreateEventSchemaFormData) => {
                if (!token) {
                    throw new Error("Token is not available");
                }
                return createEvent(event, token);
            },
            onSuccess: () => {
                // Add additional logic, e.g., refetching queries
                console.log("Event created successfully");
            },
            onError: (error) => {
                console.error("Error creating event:", error);
                // Optional: Add user notifications, e.g., toast notifications
            },
        });
    };