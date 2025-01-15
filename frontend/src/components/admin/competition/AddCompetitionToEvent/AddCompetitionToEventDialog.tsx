import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCompetitionToEventDialogContent from "./AddCompetitionToEventDialogContent";

interface AddCompetitionToEventDialogProps {
    onClose: () => void;
    competitionId: string;
}

const AddCompetitionToEventDialog: React.FC<AddCompetitionToEventDialogProps> = ({ onClose, competitionId }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Add/Remove Competition To Event
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AddCompetitionToEventDialogContent competitionId={competitionId} />
            </DialogContent>
        </Dialog>
    );
};

export default AddCompetitionToEventDialog;