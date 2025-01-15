import { GridRenderCellParams } from "@mui/x-data-grid";
import { useAddQuestionToCompetition } from "../../../../services/competition/useAddQuestionToCompetition";
import { Button } from "@mui/material";
import { useGetAllQuestions } from "../../../../services/questions/useGetAllQuestions";
import { useState } from "react";
import QuestionOverviewType from "../../questions/QuestionOverviewType";
import AdminDataTable from "../../utils/AdminDataTable";
import SearchBar from "../../utils/SearchBar";

interface AddQuestionToCompetitionDialogContentProps {
    onClose : () => void; 
    refetchCompetition: () => void;
    competitionId: string;
}

const AddQuestionToCompetitionDialogContent: React.FC<AddQuestionToCompetitionDialogContentProps> = ({ onClose, refetchCompetition, competitionId }) => {
    const { mutate: addQuestionToCompetition } = useAddQuestionToCompetition();
    const { data: allQuestions, isLoading: isGetAllQuestionLoading, isError: isGetAllQuestionError } = useGetAllQuestions();

    const handleAdd = (questionId: string ) => {
        addQuestionToCompetition({competitionId, questionId}, {
            onSuccess: () => {
                refetchCompetition();
                onClose();
            },
        });
    };

    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const columns = [
        { field: 'title', headerName: 'Questions', width: 700 },
        {
            field: 'details',
            headerName: 'View',
            width: 125,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdd(params.row.id)}
              >
                Add
              </Button>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} />
            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={850}/>
        </div>
    );
};

export default AddQuestionToCompetitionDialogContent;