import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../states/auth/useAuth";

const getAllStudent = (token: string) =>
    axios.get('http://localhost:8080/admin/student', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

export const useGetAllStudent = () => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["allStudents"],
        queryFn: () => {
            if (!token) {
                throw new Error("Token is required for authentication.");
            }
            return getAllStudent(token);
        },
    });
};
