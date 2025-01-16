import { useState } from "react";
import AdminDataTable from "../../utils/AdminDataTable";
import SearchBar from "../../utils/SearchBar";
import { useMarkAttempt } from "../../../../services/attempt/useMarkAttempt";
import { AttemptType } from "./AttemptType";
import { useGetCompetition } from "../../../../services/competition/useGetCompetition";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface MarkCompetitionDialogContentProps {
    competitionId: string;
}

const MarkCompetitionDialogContent: React.FC<MarkCompetitionDialogContentProps> = ({ competitionId }) => {
    const { data: markedAttempts } = useMarkAttempt(competitionId);
    const { data: competitionData, isLoading } = useGetCompetition(competitionId);
    const [selectedFilter, setSelectedFilter] = useState<string>("fullName");

    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const totalQuestions = competitionData?.question.length;

    // const filteredAttempts = markedAttempts?.results.filter((attempt: AttemptType) => {
    //     const fullName = `${attempt.firstName} ${attempt.lastName}`.toLowerCase();
    //     return fullName.includes(searchTerm.toLowerCase());
    // });

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedFilter(event.target.value as string);
    };


    const filteredAttempts = markedAttempts?.results.filter((attempt: AttemptType) => {
        // Use optional chaining and default to an empty string if any value is null or undefined
        const fullName = `${attempt.firstName ?? ""} ${attempt.lastName ?? ""}`.toLowerCase();
        const filterValue = searchTerm.toLowerCase();
    
        switch (selectedFilter) {
            case "fullName":
                return fullName.includes(filterValue);
            case "firstName":
                return (attempt.firstName ?? "").toLowerCase().includes(filterValue);
            case "lastName":
                return (attempt.lastName ?? "").toLowerCase().includes(filterValue);
            case "email":
                return (attempt.email ?? "").toLowerCase().includes(filterValue);
            case "school":
                return (attempt.school ?? "").toLowerCase().includes(filterValue);
            default:
                return false;
        }
    });


    const columns = [
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'lastName', headerName: 'Last Name', width: 230 },
        { field: 'firstName', headerName: 'First Name', width: 230 },
        { field: 'school', headerName: 'School', width: 230 },
        { field: 'grade', headerName: `Grade (Out of ${totalQuestions})`, width: 150 },
    ];

    const filterOptions = [
        { value: "fullName", label: "Full Name" },
        { value: "firstName", label: "First Name" },
        { value: "lastName", label: "Last Name" },
        { value: "email", label: "Email" },
        { value: "school", label: "School" },
    ];

    return (
        <div className="mt-2">
            <div className="mr-4 min-w-[200px] flex justify-between items-center">
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        label="Filter"
                    >
                        {filterOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="w-[970px] mt-4"> 
                    <SearchBar label="Search by Full Name" value={searchTerm} onChange={handleSearchChange} />
                </div>
            </div>


            <AdminDataTable columns={columns} rows={filteredAttempts} height={630} width={1170}/>
        </div>
    );
};

export default MarkCompetitionDialogContent;