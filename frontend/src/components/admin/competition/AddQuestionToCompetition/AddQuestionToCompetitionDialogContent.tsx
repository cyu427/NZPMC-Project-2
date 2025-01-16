import { GridRenderCellParams } from "@mui/x-data-grid";
import { useAddQuestionToCompetition } from "../../../../services/competition/useAddQuestionToCompetition";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    const [difficultyFilter, setDifficultyFilter] = useState<string>('');
    const [topicFilter, setTopicFilter] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDifficultyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDifficultyFilter(event.target.value as string);
    };
  
    const handleTopicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTopicFilter(event.target.value as string);
    };

    // const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) =>
    //     question.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredQuestions = allQuestions?.filter((question: QuestionOverviewType) => {
        const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = difficultyFilter ? question.difficulty === difficultyFilter : true;
        const matchesTopic = topicFilter ? question.topic === topicFilter : true;
        return matchesSearch && matchesDifficulty && matchesTopic;
    });


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
            {/* <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} /> */}
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
                <SearchBar label="Search by Question name" value={searchTerm} onChange={handleSearchChange} width="515px"/>
                
            </div>
            <AdminDataTable columns={columns} rows={filteredQuestions} height={630} width={850}/>
        </div>
    );
};

export default AddQuestionToCompetitionDialogContent;