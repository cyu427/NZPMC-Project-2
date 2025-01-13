import { Controller, useForm } from "react-hook-form";
import useRegisterContext from "../../../../states/register/useRegisterContext";
import { PersonalInfoFormData, personalInfoSchema } from "../../../../schema/register/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";

const PersonalInfoStep = () => {
    const { setStep, setFormData } = useRegisterContext();

    const { control, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
        resolver: zodResolver(personalInfoSchema),
    });

    const onSubmit = (data: PersonalInfoFormData) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep(2);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="First Name"
                        fullWidth
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                )}
            />
            <div className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary">
                    Next
                </Button>
            </div>
        </form>
    );
};

export default PersonalInfoStep;