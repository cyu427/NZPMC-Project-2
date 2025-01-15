import { Button, Dialog, Typography } from "@mui/material";
import QuestionTable from "../../../components/admin/questions/QuestionTable";
import { useGetAllQuestions } from "../../../services/questions/useGetAllQuestions";
import { useState } from "react";
import CreateQuestionDialog from "../../../components/admin/questions/CreateQuestion/CreateQuestionDialog";

const AdminQuestionPage: React.FC = () => {
    const { data: allQuestions, refetch: refetchAllQuestions } = useGetAllQuestions();

    const [createQuestionDialogOpen, setCreateQuestionDialogOpen] = useState(false);
    const handleCreateQuestion = () => {setCreateQuestionDialogOpen(true);}
    const handleCloseCreateQuestionDialog = () => {setCreateQuestionDialogOpen(false);}
    
    return (
        <>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                    Questions
                </Typography>
                <Button variant="contained" size="medium" onClick={handleCreateQuestion}>
                    Create Question
                </Button>
            </div>
            <div className="justify-items-center">
                <QuestionTable allQuestions={allQuestions} />
            </div>

            <Dialog open={createQuestionDialogOpen} onClose={handleCloseCreateQuestionDialog} fullWidth maxWidth="md">
                <CreateQuestionDialog onClose={handleCloseCreateQuestionDialog} refetchAllQuestions={refetchAllQuestions} /> 
            </Dialog>

        </>
    );
};
  
export default AdminQuestionPage;