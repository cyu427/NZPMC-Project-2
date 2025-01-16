import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MarkCompetitionDialogContent from "./MarkCompetitionDialogContent";

interface MarkCompetitionDialogProps {
    onClose: () => void;
    competitionId: string;
}

const MarkCompetitionDialog: React.FC<MarkCompetitionDialogProps> = ({ onClose, competitionId }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                Results
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <MarkCompetitionDialogContent competitionId={competitionId} />
            </DialogContent>
        </Dialog>
    );
};

export default MarkCompetitionDialog;