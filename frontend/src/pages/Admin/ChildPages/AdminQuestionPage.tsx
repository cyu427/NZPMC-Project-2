import { Button, Typography } from "@mui/material";
import QuestionTable from "../../../components/admin/questions/QuestionTable";
import SearchBar from "../../../components/admin/utils/SearchBar";

const AdminQuestionPage: React.FC = () => {

    
    return (
        <div>
            <div className="flex justify-between items-center my-4">
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                    Questions
                </Typography>
                <Button variant="contained" size="medium">
                    Create Question
                </Button>
            </div>
            <div className="justify-items-center">
                <QuestionTable />
            </div>
        </div>
    );
};
  
export default AdminQuestionPage;