import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditQuestionDialogContent from "./EditQuestionDialogContent";

interface EditQuestionDialogProps {
    onClose: () => void;
    questionId: string;
}

const EditQuestionDialog: React.FC<EditQuestionDialogProps> = ({ onClose, questionId }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Edit Question
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <EditQuestionDialogContent onClose={onClose} questionId={questionId} />
            </DialogContent>
        </Dialog>
    );
}

export default EditQuestionDialog;