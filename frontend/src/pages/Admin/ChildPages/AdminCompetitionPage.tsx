import { Button, Typography } from "@mui/material";
import React from "react";
import { useGetAllCompetition } from "../../../services/competition/useGetAllCompetition";
import CompetitionTable from "../../../components/admin/competition/CompetitionTable";

const AdminCompetitionPage: React.FC = () => {
    const { data: allCompetition, refetch: refetchAllCompetition } = useGetAllCompetition();

    return (
        <>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                    Competition
                </Typography>
                <Button variant="contained" size="medium" >
                    Create Competition
                </Button>
            </div>
            <div className="justify-items-center">
                <CompetitionTable allCompetition={allCompetition} refetchAllCompetition={refetchAllCompetition}  />
            </div>
        </>
    );
};

export default AdminCompetitionPage;