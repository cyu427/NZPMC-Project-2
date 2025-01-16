import axios from "axios";
import convertFormDataToDTO from "./utils/convertFormDataToDTO";
import { useMutation } from "@tanstack/react-query";

interface AccountData {
    email: string;
    password: string;
    firstName: string;  // matches expected type
    lastName: string;   // matches expected type
    homeSchooled: boolean;  // matches expected type
    school: string;
}

const createAccount = (account : AccountData) => {
    const newAccount = convertFormDataToDTO(account);
    return axios.post('http://localhost:8080/register', newAccount);
}

export const useCreateAccount = () => {
    // Return useMutation hook with createQuestion as the mutation function
    return useMutation({
        mutationFn: (account : AccountData) => {
            return createAccount(account);
        },
        // Optional: You can add `onSuccess` or `onError` to handle specific side effects
        onSuccess: () => {
            // For example, refetch a list of questions if needed
        },
        onError: (error) => {
            console.error("Error creating competition", error);
        },
    });
};