import { createContext } from "react";
import { UserLoginData } from "./UserLoginData";

interface AuthContextType {
    isLoggedIn: boolean;
    userId: string | null;
    role: string | null;
    token: string | null;
    login: (data: UserLoginData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;