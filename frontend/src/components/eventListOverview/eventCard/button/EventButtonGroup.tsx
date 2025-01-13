import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import SignInDialog from "../../../auth/signin/SignInDialog";
import EventCardModes from "../utils/EventCardModes";
import EventDetailsDialog from "../../../eventDetail/EventDetailsDialog";

interface EventButtonGroupProps {
    leftLabel: string;
    rightLabel: string;
    mode: EventCardModes;
    id: string;
    //onLeftClick: () => void;
    // onRightClick: () => void;
}

const EventButtonGroup: React.FC<EventButtonGroupProps> = ({ leftLabel, rightLabel, mode, id }) => {
    const [openSignInDialog, setOpenSignInDialog] = useState(false);
    const handleSignIn = () => {setOpenSignInDialog(true);}
    const handleCloseSignInDialog = () => {setOpenSignInDialog(false);}

    const [openEventDialog, setOpenEventDialog] = useState(false);
    const handleEventDialog = () => {setOpenEventDialog(true);}
    const handleCloseEventDialog = () => {setOpenEventDialog(false);}

    let onRightClick;
    if (mode === EventCardModes.NOT_LOGGED_IN) {
        onRightClick = handleSignIn;
    } else {
        onRightClick = () => {};
    }

    let onLeftClick;
    if (mode !== EventCardModes.ADMIN) {
        onLeftClick = handleEventDialog;
    } else {
        onLeftClick = () => {};
    }

    return (
        <>
            <div className="flex gap-2 ">
                <Button variant="outlined" onClick={onLeftClick} fullWidth sx={{ fontSize: "10px", padding: "2px 2px", height: "40px"}}>
                    {leftLabel}
                </Button>
                <Button variant="contained" onClick={onRightClick} fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                    {rightLabel}
                </Button>
            </div>

            <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog} fullWidth maxWidth="sm">
                <SignInDialog onClose={handleCloseSignInDialog} />
            </Dialog>

            <Dialog open={openEventDialog} onClose={handleCloseEventDialog} fullWidth maxWidth="sm">
                <EventDetailsDialog onClose={handleCloseEventDialog} eventId={id} />
            </Dialog>
        </>
    );
};

export default EventButtonGroup;