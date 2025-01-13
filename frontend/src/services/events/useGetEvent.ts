import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getEvent = (id: string) =>
    axios.get(`http://localhost:8080/event/${id}`).then(res => res.data);

export const useGetEvent = (id: string) => {
    return useQuery({
        queryKey: ["event"],
        queryFn: () => getEvent(id),
    });
};
