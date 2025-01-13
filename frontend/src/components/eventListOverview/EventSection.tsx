import { Typography } from "@mui/material";
import EventOverviewType from "./eventCard/utils/EventOverviewType";
import EventCardModes from "./eventCard/utils/EventCardModes";
import EventCarousel from "./eventCarousel/EventCarousel";

interface EventSectionProps {
    title: string;
    events: EventOverviewType[];
    mode: EventCardModes;
}

const EventSection: React.FC<EventSectionProps> = ({ title, events, mode }) => {
    return (
        <div>
            <div>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', my: 2 }}>
                    {title}
                </Typography>
            </div>

            <div>
                <EventCarousel events={events} mode={mode} />
            </div>
        </div>
    );
};

export default EventSection;