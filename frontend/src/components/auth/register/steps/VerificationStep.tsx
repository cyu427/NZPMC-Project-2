import { Controller, useForm } from "react-hook-form";
import useRegisterContext from "../../../../states/register/useRegisterContext";
import { VerificationFormData, verificationSchema } from "../../../../schema/register/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import RegisterStateType from "../../../../states/register/RegisterStepType";

interface AccountData {
    email: string;
    password: string;
    firstName: string; 
    lastName: string;   
    homeSchooled: boolean;  
    school: string;
}

const VerificationStep = () => {
    const { setStep, setFormData, formData } = useRegisterContext();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema),
    });

    // useEffect(() => {
    //     setStep(5)
    // }, [isSuccess, setStep])

    const onSubmit = async (data: VerificationFormData) => {
        setFormData((prev) => ({ ...prev, ...data }))
        const accountData: AccountData = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            homeSchooled: formData.homeSchooled,
            school: formData.school,
        };
        setStep(5);
        
        console.log(accountData);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-lg font-medium text-center mb-2">
                Verify your account
            </p>
            <p className="text-sm text-gray-600 text-center mb-2">
                A 6-digit code has been sent to {formData.email}
            </p>
            <p className="text-sm text-gray-600 text-center mb-2">
                Please enter below
            </p>

            <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        slotProps={{ htmlInput: { maxLength: 6, style: {textAlign: 'center', letterSpacing: '0.5em'} }}}
                        placeholder="• • • • • •"
                        error={!!errors.code}
                        helperText={errors.code?.message}
                    />
                )}
            />
 
            <div className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary">
                    Verify
                </Button>
            </div>
        </form>
    );
};

export default VerificationStep;