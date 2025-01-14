import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CreateEventDialogContent from "./CreateEventDialogContent";

interface CreateEventDialogProps {
    onClose: () => void;
    refetchAllEvents: () => void;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ onClose, refetchAllEvents }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    Create Event
                    <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CreateEventDialogContent onClose={onClose} refetchAllEvents={refetchAllEvents} />
                </DialogContent>
            </Dialog>
        </LocalizationProvider>
    );
}

export default CreateEventDialog;