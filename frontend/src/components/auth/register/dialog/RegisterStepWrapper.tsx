import { Step, StepLabel, Stepper } from "@mui/material";
import RegisterStateType from "../../../../states/register/RegisterStepType";
import useRegisterContext from "../../../../states/register/useRegisterContext";
import AccountStep from "../steps/AccountStep";
import EducationStep from "../steps/EducationStep";
import PersonalInfoStep from "../steps/PersonalInfoStep";
import SuccessStep from "../steps/SuccessStep";
import VerificationStep from "../steps/VerificationStep";

const steps = ['Personal Info', 'Education', 'Account', 'Verification', 'Success']

const RegisterStepWrapper = () => {
    const { step } = useRegisterContext()

    const renderStepContent = (step: RegisterStateType) => {
        switch (step) {
            case RegisterStateType.PERSONAL_INFO:
                return <PersonalInfoStep />
            case RegisterStateType.EDUCATION:
                return <EducationStep />
            case RegisterStateType.ACCOUNT:
                return <AccountStep />
            case RegisterStateType.VERIFICATION:
                return <VerificationStep />
            case RegisterStateType.SUCCESS:
                return <SuccessStep />
            default:
                return null
        }
    }

    return (
        <>
            <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {renderStepContent(step)}
        </>
    );
};

export default RegisterStepWrapper;