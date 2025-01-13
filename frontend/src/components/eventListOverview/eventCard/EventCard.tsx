import { Button, Card, CardContent, Typography } from "@mui/material";
import DateTimeSection from "./fields/DateTimeSection";
import LocationSection from "./fields/LocationSection";
import CostSection from "./fields/CostSection";
import EventButtonGroup from "./button/EventButtonGroup";
import EventCardModes from "./utils/EventCardModes";
import getButtonGroup from "./button/GetButtonGroup";

interface EventCardProps {
    name: string;
    dateTime: Date;
    location: string;
    cost: string;
    mode: EventCardModes;
    // primaryButtonLabel: string,
    // secondaryButtonLabel: string,
    // onClick: (eventId?: string) => void;
    // onClickMoreInfo: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ name, dateTime, location, cost, mode }: EventCardProps) => {

    const buttonGroup = getButtonGroup(mode);

    return (
        <Card sx={{ width: 240, height: 290, border: '1px solid black'}}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align="center" sx={{ height: '50px', mb: 2 }}>
                    {name}
                </Typography>

                <div className="mb-3">
                    <DateTimeSection dateTime= {dateTime} />
                    <LocationSection location= {location} />
                    <CostSection cost= {cost}/>
                </div>
                {buttonGroup}

            </CardContent>
        </Card>
    )
};

export default EventCard;