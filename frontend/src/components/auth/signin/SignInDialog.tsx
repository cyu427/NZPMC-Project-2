import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SignInDialogContent from "./SignInDialogContent";

interface SignInDialogProps {
    onClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ onClose }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Sign in
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <SignInDialogContent />
            </DialogContent>
        </Dialog>
    );
};

export default SignInDialog;