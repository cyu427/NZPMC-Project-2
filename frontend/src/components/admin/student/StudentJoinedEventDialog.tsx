import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import StudentJoinedEventDialogContent from "./StudentJoinedEventDialogContent";

interface StudentJoinedEventDialog {
    onClose: () => void;
    studentId: string;
}

const StudentJoinedEventDialog: React.FC<StudentJoinedEventDialog> = ({ onClose, studentId }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Joined Events
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> 
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <StudentJoinedEventDialogContent studentId={studentId} />
            </DialogContent>
        </Dialog>
    );
}

export default StudentJoinedEventDialog;