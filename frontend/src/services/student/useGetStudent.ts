import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getStudent = (id: string, token: string) =>
    axios.get(`http://localhost:8080/student/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetStudent = (id: string) => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["questions"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getStudent(id, token);
        },
    });
};
