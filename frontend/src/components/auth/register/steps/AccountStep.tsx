import { Controller, useForm } from "react-hook-form";
import useRegisterContext from "../../../../states/register/useRegisterContext";
import { AccountFormData, accountSchema } from "../../../../schema/register/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterStateType from "../../../../states/register/RegisterStepType";
import { Button, TextField } from "@mui/material";

const AccountStep = () => {
    const { setStep, setFormData } = useRegisterContext()

    const { control, handleSubmit, formState: { errors },} = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
    })

    const onSubmit = (data: AccountFormData) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(4)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                )}
            />
             <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(2)}>Back</Button>
                <Button type="submit" variant="contained" color="primary">
                    Next
                </Button>
            </div>
        </form>
    );
};

export default AccountStep;