import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CreateQuestionDialogContent from "./CreateQuestionDialogContent";

interface CreateQuestionDialogProps {
    onClose: () => void;
    refetchAllQuestions: () => void;
}

const CreateQuestionDialog: React.FC<CreateQuestionDialogProps> = ({ onClose, refetchAllQuestions }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Create Question
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CreateQuestionDialogContent onClose={onClose} refetchAllQuestions={refetchAllQuestions} />
            </DialogContent>
        </Dialog>
    );
}

export default CreateQuestionDialog;