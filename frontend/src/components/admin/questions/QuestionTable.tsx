import { Button, Dialog } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import AdminDataTable from "../utils/AdminDataTable";
import { useState } from "react";
import QuestionOverviewType from "./QuestionOverviewType";
import SearchBar from "../utils/SearchBar";
import { useDeleteQuestion } from "../../../services/questions/useDeleteQuestion";
import ViewQuestionDialog from "./ViewQuestion/ViewQuestionDialog";
import { useGetQuestion } from "../../../services/questions/useGetQuestion";

interface QuestionTableProps {
    allQuestions: QuestionOverviewType[];
    refetchAllQuestions: () => void;
}

const QuestionTable: React.FC<QuestionTableProps> = ({ allQuestions, refetchAllQuestions }) => {
    const columns = [
        { field: 'title', headerName: 'Questions', width: 950 },
        {
            field: 'details',
            headerName: 'View',
            width: 125,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewQuestion(params.row.id)}
              >
                View
              </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 125,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDelete(params.row.id)}
                sx = {{backgroundColor: 'red'}}
              >
                Delete
              </Button>
            ),
        },

    ];

    const [questionId, setQuestionId] = useState<string>('');

    const [vieweQuestionDialogOpen, setViewQuestionDialogOpen] = useState(false);
    const handleViewQuestion = (id: string) => {
        setQuestionId(id);
        setViewQuestionDialogOpen(true);
    }
    const handleCloseViewQuestionDialog = () => {setViewQuestionDialogOpen(false);}
    

    const [searchTerm, setSearchTerm] = useState<string>("");
    const { mutate: deleteQuestion, isLoading, isError, isSuccess: isDeleteQuestionSuccess } = useDeleteQuestion();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter events based on search term
    const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        deleteQuestion(id);
        refetchAllQuestions();
    }

    return (
        <>
            <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} />
            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={1200}/>

            <Dialog open={vieweQuestionDialogOpen} onClose={handleCloseViewQuestionDialog} fullWidth maxWidth="md">
                <ViewQuestionDialog onClose={handleCloseViewQuestionDialog} id={questionId} /> 
            </Dialog>
        </>
    );
};

export default QuestionTable;