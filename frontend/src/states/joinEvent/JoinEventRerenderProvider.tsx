import { ReactNode, useState } from "react";
import JoinEventRerenderContext from "./JoinEventRerenderContext";

interface JoinEventRerenderProviderProps {
    children: ReactNode;
}

const JoinEventRerenderProvider: React.FC<JoinEventRerenderProviderProps> = ({ children }) => {
    const [rerenderState, setRerenderState] = useState<number | null>(null);

    return (
        <JoinEventRerenderContext.Provider value={{ rerenderState, setRerenderState }}>
            {children}
        </JoinEventRerenderContext.Provider>
    );
};

export default JoinEventRerenderProvider;