import { useContext } from "react";
import { RegisterContext } from "./RegisterContext";

const useRegisterContext = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error('useRegisterContext must be used within a RegisterProvider');
    }
    return context;
};

export default useRegisterContext;