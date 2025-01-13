import Typography from '@mui/material/Typography';
import CalendarIcon from '../icons/CalendarIcon';

interface DateTimeSectionProps {
    dateTime?: Date | string; 
}

const DateTimeSection: React.FC<DateTimeSectionProps> = ({ dateTime }) => {
    const validDateTime = dateTime instanceof Date 
        ? dateTime 
        : dateTime 
            ? new Date(dateTime) 
            : null;
            
    const formattedDateTime = validDateTime 
        ? new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(validDateTime)
        : 'Date Not Available';

    return (
        <div className="flex items-center">
            <CalendarIcon />
            <Typography variant="body2" sx={{ color: 'text.primary', marginLeft: 1, fontSize: 15 }}>
                {formattedDateTime}
            </Typography>
        </div>
    );
};

export default DateTimeSection;