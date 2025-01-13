import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RegisterStepWrapper from "./RegisterStepWrapper";

interface RegisterDialogProps {
    onClose: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ onClose }) => {
    return (
        <Dialog open={true} maxWidth="sm" fullWidth onClose={onClose}>
            <DialogTitle>
                Registration
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent>
                <RegisterStepWrapper />
            </DialogContent>
    </Dialog>
    );
};

export default RegisterDialog;