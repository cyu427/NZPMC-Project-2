import { Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetAllCompetition } from "../../../services/competition/useGetAllCompetition";
import CompetitionTable from "../../../components/admin/competition/CompetitionTable";
import CreateCompetitionDialog from "../../../components/admin/competition/CreateCompetition/CreateCompetitionDialog";

const AdminCompetitionPage: React.FC = () => {
    const { data: allCompetition, refetch: refetchAllCompetition } = useGetAllCompetition();

    const [createCompetitionDialogOpen, setCreateCompetitionDialogOpen] = useState(false);
    const handleCompetitionQuestion = () => {setCreateCompetitionDialogOpen(true);}
    const handleCloseCreateCompetitionDialog = () => {setCreateCompetitionDialogOpen(false);}

    return (
        <>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                    Competition
                </Typography>
                <Button variant="contained" size="medium" onClick={handleCompetitionQuestion}>
                    Create Competition
                </Button>
            </div>
            <div className="justify-items-center">
                <CompetitionTable allCompetition={allCompetition} refetchAllCompetition={refetchAllCompetition}  />
            </div>

            <Dialog open={createCompetitionDialogOpen} onClose={handleCloseCreateCompetitionDialog} fullWidth maxWidth="md">
                <CreateCompetitionDialog onClose={handleCloseCreateCompetitionDialog} refetchAllCompetitions={refetchAllCompetition} /> 
            </Dialog>
        </>
    );
};

export default AdminCompetitionPage;