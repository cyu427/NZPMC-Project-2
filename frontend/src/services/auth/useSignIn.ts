import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SignInFormData } from "../../schema/signin/signinSchema";
import useAuth from "../../states/auth/useAuth";
import { UserLoginData } from "../../states/auth/UserLoginData";


const signIn = async (credentials : SignInFormData) => {
    const response = await axios.post('http://localhost:8080/login', credentials);
    return response.data;
}

export const useSignIn = () => {
    const { login } = useAuth();

    // Return useMutation hook with createQuestion as the mutation function
    return useMutation({
        mutationFn: signIn,
        onSuccess: (data : UserLoginData) => {
            login(data);
        },
        onError: (error) => {
            console.error("Error logging in", error);
        },
    });
}