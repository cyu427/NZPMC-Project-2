import { Button, DialogContent } from "@mui/material";
import AdminDataTable from "../../utils/AdminDataTable";
import { useGetQuestion } from "../../../../services/questions/useGetQuestion";
import QuestionType, { Choice } from "./QuestionType";

interface ViewQuestionDialogContentProps {
    id: string;
    questionData: QuestionType;
}

const ViewQuestionDialogContent : React.FC<ViewQuestionDialogContentProps> = ({ id, questionData }) => {
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

    return (
        <DialogContent dividers>
            <div className="flex justify-between mb-5"> 
                <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '45%'}} >
                    Edit Question
                </Button>
                <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '45%'}} >
                    Add to Event
                </Button>
            </div>
            <AdminDataTable rows={questionData.options} columns={columns} height={317} width={490} />
            <Button variant="outlined" color='error' onClick={handleClickOpen} sx={{ marginTop: '20px', width: '100%'}}>
                Delete Question
            </Button>
        </DialogContent>
    );
};

export default ViewQuestionDialogContent;