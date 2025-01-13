import { useState } from "react";
import { RegisterContext, RegisterState, initialRegisterState } from "./RegisterContext";

const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ step, setStep ] = useState<RegisterState['step']>(1);
    const [formData, setFormData] = useState(initialRegisterState.formData)

    return (
        <RegisterContext.Provider value={{ step, setStep, formData, setFormData }}>
            {children}
        </RegisterContext.Provider>
    );
};

export default RegisterProvider;