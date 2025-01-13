import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getAllEvents = () =>
    axios.get('http://localhost:8080/event').then(res => res.data);

export const useGetAllEvents = () => {
    return useQuery({
        queryKey: ["allEvents"],
        queryFn: getAllEvents,
    });
};