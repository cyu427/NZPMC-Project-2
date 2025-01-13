import { createContext, Dispatch, SetStateAction } from "react"
import RegisterStepType from "./RegisterStepType"

export interface RegisterState {
    step: RegisterStepType
    formData: {
        firstName: string
        lastName: string
        homeSchooled: boolean
        school: string
        email: string
        password: string
        confirmPassword: string
        code: string
    }
    setStep: Dispatch<SetStateAction<RegisterStepType>>
    setFormData: Dispatch<SetStateAction<RegisterState["formData"]>>
}

export const initialRegisterState: RegisterState = {
    step: RegisterStepType.PERSONAL_INFO,
    formData: {
        firstName: "",
        lastName: "",
        homeSchooled: false,
        school: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: ""
    },
    setStep: () => {},
    setFormData: () => {}
}

export const RegisterContext = createContext<RegisterState>(initialRegisterState)