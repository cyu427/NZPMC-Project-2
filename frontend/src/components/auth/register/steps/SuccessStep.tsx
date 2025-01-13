import { Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessStep = () => {
    return (
        <div className="text-center">
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <p className="text-lg font-semibold mb-2">
                Success
            </p>
            <p className="text-base text-gray-600 mb-4">
                Congratulations, your account has been successfully created.
            </p>

            <Button variant="contained" color="primary">
                Sign in
            </Button>
        </div>
    );
};

export default SuccessStep;