import { ReactNode, useEffect, useState } from "react";
import { UserLoginData } from "./UserLoginData";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ userId, setUserId ] = useState<string | null>(null);
    const [ role, setRole ] = useState<string | null>(null);
    const [ token, setToken ] = useState<string | null>(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    // Load initial state from sessionStorage
    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        const storedRole = sessionStorage.getItem('role');
        const storedToken = sessionStorage.getItem('token');
        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setUserId(storedUserId);
            setRole(storedRole);
            setToken(storedToken);
        }
    }, []);

    const login = (userData: UserLoginData) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    
        sessionStorage.setItem('userId', userData.userId);
        setUserId(userData.userId);
    
        sessionStorage.setItem('role', userData.role);
        setRole(userData.role);
    
        sessionStorage.setItem('token', userData.token);
        setToken(userData.token);
    }

    const logout = () => {
        sessionStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
    
        sessionStorage.removeItem('userId');
        setUserId(null);
    
        sessionStorage.removeItem('role');
        setRole(null);
    
        sessionStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;