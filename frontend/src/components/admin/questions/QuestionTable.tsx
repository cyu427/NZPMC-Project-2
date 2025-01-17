import { Button, Dialog, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    const [difficultyFilter, setDifficultyFilter] = useState<string>('');
    const [topicFilter, setTopicFilter] = useState<string>('');

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

    const handleDifficultyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setDifficultyFilter(event.target.value as string);
  };

  const handleTopicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setTopicFilter(event.target.value as string);
  };

    // Filter events based on search term
    // const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) =>
    //     question.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // Filter questions based on search term, difficulty, and topic
    const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) => {
      const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter ? question.difficulty === difficultyFilter : true;
      const matchesTopic = topicFilter ? question.topic === topicFilter : true;
      return matchesSearch && matchesDifficulty && matchesTopic;
  });


    const handleDelete = (id: string) => {
      deleteQuestion(id, {
        onSuccess: () => {
            // Refetch the questions list after deletion
            refetchAllQuestions();
        },
      });
    }

    return (
        <>
            {/* <SearchBar label="Search by Question name" value={searchTerm} onChange={() => handleSearchChange} /> */}

            <div className="flex gap-4 my-4 w-full justify-start">
                <FormControl style={{ minWidth: 150  }}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select value={difficultyFilter} onChange={handleDifficultyChange} labelId="difficulty-label" label="Difficulty">
                        <MenuItem value="">All Difficulties</MenuItem>
                        <MenuItem value="EASY">Easy</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HARD">Hard</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ minWidth: 150 }}>
                    <InputLabel>Topic</InputLabel>
                    <Select value={topicFilter} onChange={handleTopicChange} labelId="topic-label" label="Topic">
                        <MenuItem value="">All Topics</MenuItem>
                        <MenuItem value="WAVES">Waves</MenuItem>
                        <MenuItem value="GEOMETRY">Geometry</MenuItem>
                        <MenuItem value="ALGEBRA">Algebra</MenuItem>
                        <MenuItem value="MECHANICS">Mechanics</MenuItem>``
                        {/* Add other topics dynamically if needed */}
                    </Select>
                </FormControl>
                <div className="flex w-full justify-end">
                  <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} width="870px" />
                </div>
            </div>

            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={1200}/>

            <Dialog open={vieweQuestionDialogOpen} onClose={handleCloseViewQuestionDialog} fullWidth maxWidth="md">
                <ViewQuestionDialog onClose={handleCloseViewQuestionDialog} id={questionId} refetchAllQuestions={refetchAllQuestions} /> 
            </Dialog>
        </>
    );
};

export default QuestionTable;