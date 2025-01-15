import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CreateCompetitionDialogContent from "./CreateCompetitionDialogContent";

interface CreateCompetitionDialogProps {
    onClose: () => void;
    refetchAllCompetitions: () => void;
}

const CreateCompetitionDialog: React.FC<CreateCompetitionDialogProps> = ({ onClose, refetchAllCompetitions }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Create Competition
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CreateCompetitionDialogContent onClose={onClose} refetchAllCompetitions={refetchAllCompetitions} />
            </DialogContent>
        </Dialog>
    );
}

export default CreateCompetitionDialog;