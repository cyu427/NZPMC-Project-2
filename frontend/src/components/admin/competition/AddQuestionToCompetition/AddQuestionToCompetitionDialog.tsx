import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddQuestionToCompetitionDialogContent from "./AddQuestionToCompetitionDialogContent";

interface AddQuestionToCompetitionDialogProps {
    onClose: () => void;
    refetchCompetition: () => void;
    competitionId: string;
}

const AddQuestionToCompetitionDialog: React.FC<AddQuestionToCompetitionDialogProps> = ({ onClose, refetchCompetition, competitionId }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Add/Remove Question to Competition
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AddQuestionToCompetitionDialogContent onClose={onClose} refetchCompetition={refetchCompetition} competitionId={competitionId} />
            </DialogContent>
        </Dialog>
    );
};

export default AddQuestionToCompetitionDialog;