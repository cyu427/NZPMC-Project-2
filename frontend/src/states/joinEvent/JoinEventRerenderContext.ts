import { createContext } from "react";

interface JoinEventRerenderContextType {
    rerenderState: number | null;
    setRerenderState: (value: number | null) => void;
}

const JoinEventRerenderContext = createContext<JoinEventRerenderContextType>({
    rerenderState: null,
    setRerenderState: () => {}
});

export default JoinEventRerenderContext;