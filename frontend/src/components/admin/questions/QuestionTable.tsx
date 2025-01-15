import { Button } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import AdminDataTable from "../utils/AdminDataTable";
import { useGetAllQuestions } from "../../../services/questions/useGetAllQuestions";
import { useState } from "react";
import QuestionOverviewType from "./QuestionOverviewType";
import SearchBar from "../utils/SearchBar";

interface QuestionTableProps {
    allQuestions: QuestionOverviewType[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ allQuestions }) => {
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
                onClick={() => handleView(params.row)}
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
                onClick={() => handleDelete()}
                sx = {{backgroundColor: 'red'}}
              >
                Delete
              </Button>
            ),
        },

    ];

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter events based on search term
    const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} />
            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={1200}/>
        </>
    );
};

export default QuestionTable;