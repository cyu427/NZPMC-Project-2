import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useGetQuestion } from "../../../../services/questions/useGetQuestion";
import ViewQuestionDialogContent from "./ViewQuestionDialogContent";

interface ViewQuestionDialogProps {
    onClose: () => void;
    id: string;
    refetchAllQuestions: () => void;
}

const ViewQuestionDialog: React.FC<ViewQuestionDialogProps> = ({ onClose, id, refetchAllQuestions }) => {
    const { data: questionData, isLoading, isError } = useGetQuestion(id);
    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {questionData.question}
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ViewQuestionDialogContent id={id} questionData={questionData} refetchAllQuestions={refetchAllQuestions} onClose={onClose}/>
            </DialogContent>
        </Dialog>
    );
}

export default ViewQuestionDialog;