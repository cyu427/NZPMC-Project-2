import { SignInFormData, signInSchema } from "../../../schema/signin/signinSchema";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from "@mui/material";
import { useSignIn } from "../../../services/auth/useSignIn";
import useAuth from "../../../states/auth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignInDialogContent: React.FC = () => {
    const { role } = useAuth();
    const { mutate } = useSignIn();
    const navigate = useNavigate();

    const { control, handleSubmit, formState: {errors} } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onLoginSubmit = (credentials: SignInFormData) => {
        mutate(credentials);
    };

    useEffect(() => {
        if (role) {
            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/signed-in');
            }
        }
      }, [role, navigate]); // Run when userId changes

    return (
        <>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
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