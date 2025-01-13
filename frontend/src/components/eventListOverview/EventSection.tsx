import { Typography } from "@mui/material";

interface Event {
    id: string;
    name: string;
    dateTime: Date;
    location: string;
    cost: string;
    description: string;
}

interface EventSectionProps {
    title: string;
    events: Event[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => {
    return (
        <div>
            <div>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {title}
                </Typography>
            </div>

            <div>
                
            </div>
        </div>
    );
};

export default EventSection;