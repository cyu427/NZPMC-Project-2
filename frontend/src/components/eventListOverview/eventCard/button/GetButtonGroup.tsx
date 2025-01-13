import { Button } from "@mui/material";
import EventButtonGroup from "./EventButtonGroup";
import EventCardModes from "../utils/EventCardModes";

const getButtonGroup = (mode: EventCardModes, id: string) => {

    switch (mode) {
        case EventCardModes.ADMIN:
            return <EventButtonGroup leftLabel="View" rightLabel="Edit" mode={EventCardModes.ADMIN} id={id} />;
        case EventCardModes.NOT_LOGGED_IN:
            return <EventButtonGroup leftLabel="View" rightLabel="Sign in to Join" mode={EventCardModes.NOT_LOGGED_IN} id={id} />;
        case EventCardModes.USER_NOT_JOINED:
            return <EventButtonGroup leftLabel="View" rightLabel="Join" mode={EventCardModes.USER_NOT_JOINED} id={id} />;
        case EventCardModes.USER_JOINED:
            return (
                <Button variant="contained" fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                    View
                </Button>
            );
        default:
            return (
                <Button variant="contained" fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                    View
                </Button>
            );
    }
};

export default getButtonGroup;
