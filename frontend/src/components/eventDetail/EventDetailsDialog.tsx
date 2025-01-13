import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SyntheticEvent, useState } from "react";
import EventDetailsContent from "./EventDetailsContent";
import { useGetEvent } from "../../services/events/useGetEvent";

interface EventDetailsDialogProps {
    eventId: string;
    onClose: () => void;
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({ eventId, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    const { data: event, isLoading, isError, isSuccess } = useGetEvent(eventId);
    // console.log(eventId);
    // console.log(event);

    if (isLoading) {
        return (
          <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent>
              <CircularProgress />
            </DialogContent>
          </Dialog>
        );
      }
    
      if (isError || !event) {
        return (
          <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent>
              <Typography color="error">Error loading event details.</Typography>
            </DialogContent>
          </Dialog>
        );
      }
    
      if (isSuccess) {
        console.log("Event data:", event); // Log the event data to the console
      }
    
    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ position: 'relative' }}>
                {event.name}
                <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="border-b border-divider mb-2">
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="event tabs">
                        <Tab label="Event Details" />
                    </Tabs>
                </div>
                {activeTab === 0 && (
                <EventDetailsContent eventDetails={event}/>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventDetailsDialog;