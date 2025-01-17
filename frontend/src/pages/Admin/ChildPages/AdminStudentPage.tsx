import { Typography } from "@mui/material";
import React from "react";
import { useGetAllStudent } from "../../../services/student/useGetAllStudents";
import StudentTable from "../../../components/admin/student/StudentTable";

const AdminStudentPage: React.FC = () => {
    const { data: allStudents } = useGetAllStudent();

    // const [createCompetitionDialogOpen, setCreateCompetitionDialogOpen] = useState(false);
    // const handleCompetitionQuestion = () => {setCreateCompetitionDialogOpen(true);}
    // const handleCloseCreateCompetitionDialog = () => {setCreateCompetitionDialogOpen(false);}

    return (
        <>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                    Students
                </Typography>
            </div>
            <div className="justify-items-center">
                <StudentTable allStudents={allStudents} />
            </div>
        </>
    );
};

export default AdminStudentPage;