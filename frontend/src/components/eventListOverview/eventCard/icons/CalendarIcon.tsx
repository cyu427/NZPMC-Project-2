import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from '@mui/material';

const CalendarIcon: React.FC = () => {
    return (
        <div>
            <IconButton sx={{ pointerEvents: 'none' }}> {/* Adjust the size here */}
                <CalendarMonthIcon sx={{ fontSize: 30, color: 'black' }} />
            </IconButton>
        </div>
    );
};

export default CalendarIcon;
