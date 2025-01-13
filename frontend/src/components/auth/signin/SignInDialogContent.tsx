import { SignInFormData, signInSchema } from "../../../schema/signin/signinSchema";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from "@mui/material";

const SignInDialogContent: React.FC = () => {

    const { control, handleSubmit, formState: {errors} } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    return (
        <>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
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

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign in
                </Button>
            </form>
        </>
    );
};

export default SignInDialogContent;