import { Alert, Button, Dialog, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import SignInDialog from "../../../auth/signin/SignInDialog";
import EventCardModes from "../utils/EventCardModes";
import EventDetailsDialog from "../../../eventDetail/EventDetailsDialog";
import { useJoinEvent } from "../../../../services/events/useJoinEvent";
import useAuth from "../../../../states/auth/useAuth";
import useJoinEventRerender from "../../../../states/joinEvent/useJoinEventRerender";
import { set } from "zod";
import EditEventDialog from "../../../event/editEvent/EditEventDialog";
import { useUpdateEvent } from "../../../../services/events/useUpdateEvent";

interface EventButtonGroupProps {
    leftLabel?: string;
    rightLabel?: string;
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

    const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
    const handleEditEvent = () => {setEditEventDialogOpen(true);}
    const handleCloseEditEventDialog = () => {setEditEventDialogOpen(false);}

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const { setRerenderState, rerenderState } = useJoinEventRerender();
    const { userId } = useAuth();
    const { mutate: joinEvent, isPending: isPendingJoin, isError: isJoinError, isSuccess: isJoinSuccess } = useJoinEvent();
    const handleJoinEvent = () => {
        joinEvent({ eventId: id, userId: userId! });
    };

    useEffect(() => {
        if (isJoinSuccess) {
            setOpenSuccessSnackbar(true);
            setRerenderState(Math.random());
        }
    }, [isJoinSuccess, setRerenderState]);

    useEffect(() => {
        if (!editEventDialogOpen) {
            setRerenderState(Math.random());
        }
    }, [editEventDialogOpen]);
    

    let onLeftClick;
    let onRightClick;

    if (mode === EventCardModes.NOT_LOGGED_IN) {
        onLeftClick = handleEventDialog;
        onRightClick = handleSignIn;
    } else if (mode === EventCardModes.USER_NOT_JOINED) {
        onLeftClick = handleEventDialog;
        onRightClick = handleJoinEvent;
    } else if (mode === EventCardModes.ADMIN) {
        onLeftClick = handleEventDialog;
        onRightClick = handleEditEvent;
    }

    return (
        

        <>
            {mode !== EventCardModes.USER_JOINED ? (
                <div className="flex gap-2">
                    <Button variant="outlined" onClick={onLeftClick} fullWidth sx={{ fontSize: "10px", padding: "2px 2px", height: "40px" }}>
                        {leftLabel}
                    </Button>
                    <Button variant="contained" onClick={onRightClick} fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                        {rightLabel}
                    </Button>
                </div>
            ) : (
                <Button variant="contained" onClick={handleEventDialog} fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                    View
                </Button>
            )}

            <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog} fullWidth maxWidth="sm">
                <SignInDialog onClose={handleCloseSignInDialog} />
            </Dialog>

            <Dialog open={openEventDialog} onClose={handleCloseEventDialog} fullWidth maxWidth="sm">
                <EventDetailsDialog onClose={handleCloseEventDialog} eventId={id} />
            </Dialog>

            <Dialog open={editEventDialogOpen} onClose={handleCloseEditEventDialog} fullWidth maxWidth="md">
                <EditEventDialog onClose={handleCloseEditEventDialog} eventId={id} /> 
            </Dialog>

            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={3000} // Snackbar will auto-close after 3 seconds
                onClose={() => setOpenSuccessSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    width: '400px', // Making the Snackbar wider
                    fontSize: '18px', // Increasing the font size for better visibility
                    padding: '16px', // Adding extra padding
                }}

            >
                <Alert severity="success" sx={{ width: '100%', fontSize: '18px', padding: '16px' }}>
                    Successfully joined the event!
                </Alert>
            </Snackbar>

        </>
    );
};

export default EventButtonGroup;