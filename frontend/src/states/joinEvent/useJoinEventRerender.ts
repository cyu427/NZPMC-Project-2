import { useContext } from "react";
import JoinEventRerenderContext from "./JoinEventRerenderContext";

const useJoinEventRerender = () => {
    const context = useContext(JoinEventRerenderContext);

    if (context === undefined) {
        throw new Error('useJoinEventRerender must be used within a JoinEventRerenderProvider');
    }

    return context;
}

export default useJoinEventRerender;