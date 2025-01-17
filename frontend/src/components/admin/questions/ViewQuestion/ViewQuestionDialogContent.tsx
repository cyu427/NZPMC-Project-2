import { Button, Dialog, DialogContent } from "@mui/material";
import AdminDataTable from "../../utils/AdminDataTable";
import QuestionType, { Choice } from "./QuestionType";
import EditQuestionDialog from "../EditQuestion/EditQuestionDialog";
import { useState } from "react";
import { useDeleteQuestion } from "../../../../services/questions/useDeleteQuestion";

interface ViewQuestionDialogContentProps {
    id: string;
    questionData: QuestionType;
    refetchAllQuestions: () => void;
    onClose: () => void;
}

const ViewQuestionDialogContent : React.FC<ViewQuestionDialogContentProps> = ({ id, questionData, refetchAllQuestions, onClose }) => {
    const columns = [
        { field: 'text', headerName: 'Options', width: 350 },
        { field: 'isCorrect', headerName: 'True/False', width: 100 },
    ];

    questionData.options.forEach((option : Choice, index : number) => {
        option.id = index + 1;
    });

    const handleClickOpen = (): void => {
        console.log('Delete Question button clicked');
      };

    const { mutate: deleteQuestion } = useDeleteQuestion();
    const handleDelete = (id: string) => {
    deleteQuestion(id, {
        onSuccess: () => {
            // Refetch the questions list after deletion
            refetchAllQuestions();
            onClose();
        },
    });
    }

    const [editQuestionDialogOpen, setEditQuestionDialogOpen] = useState(false);
    const handleEditQuestionDialogOpen = () => {setEditQuestionDialogOpen(true);}
    const handleCloseEditQuestionDialogOpen = () => {setEditQuestionDialogOpen(false);}

    return (
        <>
            <DialogContent dividers>
                <div className="flex justify-between mb-5"> 
                    <Button variant="outlined" onClick={handleEditQuestionDialogOpen} fullWidth >
                        Edit Question
                    </Button>
                </div>
                <AdminDataTable rows={questionData.options} columns={columns} height={317} width={490} />
                <Button variant="outlined" color='error' onClick={() => handleDelete(id)} sx={{ marginTop: '20px', width: '100%'}}>
                    Delete Question
                </Button>
            </DialogContent>

            <Dialog open={editQuestionDialogOpen} onClose={handleCloseEditQuestionDialogOpen} fullWidth maxWidth="md">
                <EditQuestionDialog onClose={handleCloseEditQuestionDialogOpen} questionId={id} /> 
            </Dialog>
        </>
    );
};

export default ViewQuestionDialogContent;