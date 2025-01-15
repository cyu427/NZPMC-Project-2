import { GridRenderCellParams } from "@mui/x-data-grid";
import { useAddQuestionToCompetition } from "../../../../services/competition/useAddQuestionToCompetition";
import { Button } from "@mui/material";
import { useGetAllQuestions } from "../../../../services/questions/useGetAllQuestions";
import { useState } from "react";
import QuestionOverviewType from "../../questions/QuestionOverviewType";
import AdminDataTable from "../../utils/AdminDataTable";
import SearchBar from "../../utils/SearchBar";
import { useGetCompetition } from "../../../../services/competition/useGetCompetition";
import { useRemoveQuestionFromCompetition } from "../../../../services/competition/useRemoveQuestionFromCompetition";

interface AddQuestionToCompetitionDialogContentProps {
    onClose : () => void; 
    refetchCompetition: () => void;
    competitionId: string;
}

const AddQuestionToCompetitionDialogContent: React.FC<AddQuestionToCompetitionDialogContentProps> = ({ onClose, refetchCompetition, competitionId }) => {
    const { mutate: addQuestionToCompetition } = useAddQuestionToCompetition();
    const { mutate: removeQuestionFromCompetition } = useRemoveQuestionFromCompetition();
    const { data: allQuestions, refetch: refetchAllQuestions } = useGetAllQuestions();
    const { data: competitionData } = useGetCompetition(competitionId);

    const questionIds = competitionData?.question.map((q) => q.id) || [];

    const handleAdd = (questionId: string ) => {
        addQuestionToCompetition({competitionId, questionId}, {
            onSuccess: () => {
                refetchAllQuestions();
                refetchCompetition();
            },
        });
    };

    const handleRemove = (questionId: string) => {
        removeQuestionFromCompetition({competitionId, questionId}, {
            onSuccess: () => {
                refetchAllQuestions();
                refetchCompetition();
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
        { field: 'title', headerName: 'Questions', width: 630 },
        {
            field: 'details',
            headerName: 'Add/Remove from Competition',
            width: 220,
            renderCell: (params: GridRenderCellParams) => {
                const isInCompetition = questionIds.includes(params.row.id);

                return isInCompetition ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemove(params.row.id)}
                    >
                        Remove
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd(params.row.id)}
                    >
                        Add
                    </Button>
                );
            }
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