import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditEventDialogContent from "./EditEventDialogContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface EditEventDialogProps {
    onClose: () => void;
    eventId: string;
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({ onClose, eventId }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    Edit Competition
                    <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <EditEventDialogContent onClose={onClose} eventId={eventId}  />
                </DialogContent>
            </Dialog>
        </LocalizationProvider>
    );
}

export default EditEventDialog;