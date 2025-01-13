import { EventDetails } from "./EventDetails";
import timeFormatter from "./utils/timeFormatter";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface EventDetailsContentProps {
    eventDetails: EventDetails;
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({ eventDetails }: EventDetailsContentProps) => {
    
    const { formattedDate, formattedTime } = timeFormatter({ dateTime: eventDetails.dateTime });
    
    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
                <div dangerouslySetInnerHTML={{ __html: eventDetails.description }} />
            </div>
            <div className="col-span-1 ml-20">
                <div className="flex items-center gap-2 mb-2">
                    <CalendarTodayIcon color="action" fontSize="large" />
                    <p className="text-base text-gray-700">{formattedDate}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <AccessTimeIcon color="action" fontSize="large" />
                    <p className="text-base text-gray-700">{formattedTime}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <LocationOnIcon color="action" fontSize="large" />
                    <p className="text-base text-gray-700">{eventDetails.location}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <AttachMoneyIcon color="action" fontSize="large" />
                    <p className="text-base text-gray-700">{eventDetails.cost}</p>
                </div>
            </div>

        </div>
    );
};

export default EventDetailsContent;

