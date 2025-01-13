import { Button, Card, CardContent, Typography } from "@mui/material";
import DateTimeSection from "./fields/DateTimeSection";
import LocationSection from "./fields/LocationSection";
import CostSection from "./fields/CostSection";
import EventButtonGroup from "./EventButtonGroup";
import Role from "../../../utils/Role";
import EventCardModes from "./utils/EventCardModes";

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

const adminButtons = (<EventButtonGroup leftLabel="View" rightLabel="Edit" />);
const notLoggedInButtons = (<EventButtonGroup leftLabel="View" rightLabel="Sign in to Join" />);
const userNotJoinedButtons = (<EventButtonGroup leftLabel="View" rightLabel="Join" />);
const userJoinedButtons = (
    <Button variant="contained" fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
        View
    </Button>
);

const EventCard: React.FC<EventCardProps> = ({ name, dateTime, location, cost, mode }: EventCardProps) => {

    let buttonGroup;

    switch (mode) {
        case EventCardModes.ADMIN:
            buttonGroup = adminButtons;
            break;
        case EventCardModes.NOT_LOGGED_IN:
            buttonGroup = notLoggedInButtons;
            break;
        case EventCardModes.USER_NOT_JOINED:
            buttonGroup = userNotJoinedButtons;
            break;
        case EventCardModes.USER_JOINED:
            buttonGroup = userJoinedButtons;
            break;
        default:
            buttonGroup = userJoinedButtons;
            break;
    }

    return (
        <Card sx={{ width: 240, height: 270, border: '1px solid black'}}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align="center">
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