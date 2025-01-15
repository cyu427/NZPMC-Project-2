import { Button, Dialog } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import AdminDataTable from "../utils/AdminDataTable";
import { useState } from "react";
import SearchBar from "../utils/SearchBar";
import CompetitionOverviewType from "./CompetitionOverviewType";
import { useNavigate } from "react-router";

interface CompetitionTableProps {
    allCompetition: CompetitionOverviewType[];
    refetchAllCompetition: () => void;
}

const CompetitionTable: React.FC<CompetitionTableProps> = ({ allCompetition, refetchAllCompetition }) => {
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
                //onClick={() => handleDelete(params.row.id)}
                sx = {{backgroundColor: 'red'}}
              >
                Delete
              </Button>
            ),
        },
    ];

    const navigate = useNavigate();
    const handleViewQuestion = (id: string) => {
        navigate(`/admin/competition/${id}`);
    }
    

    const [searchTerm, setSearchTerm] = useState<string>("");
    // const { mutate: deleteQuestion, isLoading, isError, isSuccess: isDeleteQuestionSuccess } = useDeleteQuestion();

    const handleSearchChange = (competition: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(competition.target.value);
    };

    // Filter events based on search term
    const filteredQuestions = allCompetition?.filter((competition: CompetitionOverviewType) =>
        competition.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const handleDelete = (id: string) => {
    //     deleteQuestion(id);
    //     refetchAllQuestions();
    // }

    return (
        <>
            <SearchBar label="Search by Competition name" value={searchTerm} onChange={handleSearchChange} />
            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={1200}/>

            {/* <Dialog open={vieweQuestionDialogOpen} onClose={handleCloseViewQuestionDialog} fullWidth maxWidth="md">
                <ViewQuestionDialog onClose={handleCloseViewQuestionDialog} id={questionId} /> 
            </Dialog> */}
        </>
    );
};

export default CompetitionTable;