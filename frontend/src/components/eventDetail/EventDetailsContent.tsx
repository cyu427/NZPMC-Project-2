import { EventDetails } from "./EventDetails";
import timeFormatter from "./utils/timeFormatter";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button, Dialog, Typography } from "@mui/material";
import { useGetEventsStudentsJoined } from "../../services/events/useGetEventsStudentJoined";
import useAuth from "../../states/auth/useAuth";
import { useNavigate } from "react-router";
import Role from "../../utils/Role";
import MarkCompetitionDialog from "../admin/competition/MarkCompetition/MarkCompetitionDialog";
import { useState } from "react";
import { useGetEvent } from "../../services/events/useGetEvent";

interface EventDetailsContentProps {
    eventDetails: EventDetails;
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({ eventDetails }: EventDetailsContentProps) => {
    const { userId, role } = useAuth();
    const { formattedDate, formattedTime } = timeFormatter({ dateTime: eventDetails.dateTime });
    const { data: eventJoined, isLoading: isEventJoinedLoading, isError: isEventJoinedError } = useGetEventsStudentsJoined(userId!);
    const navigate = useNavigate();
    
    const { data: event } = useGetEvent(eventDetails.id);
    const endDateTime = event?.endDateTime;
    const { formattedDate: endDate, formattedTime: endTime } = timeFormatter({ dateTime: endDateTime });

    const handleStartCompetition = (id: string, dateTime: string) => {navigate(`/attempt/${id}/${dateTime}`);}

    const [markCompetitionDialogOpen, setMarkCompetitionDialogOpen] = useState(false);
    const handleCloseMarkCompetitionDialog = () => {setMarkCompetitionDialogOpen(false);}
    const handleMarkCompetition = () => {setMarkCompetitionDialogOpen(true);}

    if ( role===Role.STUDENT && isEventJoinedLoading) {
        return <div>Loading...</div>;
    }

    if ( role===Role.STUDENT && isEventJoinedError) {
        return <div>Error...</div>;
    }

    let isEventJoined = [];
    if ( role === Role.STUDENT) {
        isEventJoined = eventJoined.some(event => event.id === eventDetails.id);
    }

    const eventDetailsContentButton = () => {
        if (role===Role.STUDENT &&isEventJoined && eventDetails.competitionId) {
            return (
                <div className="flex flex-col items-center gap-2 mb-2 w-full">
                    <Button variant="contained" fullWidth onClick={() => handleStartCompetition(eventDetails.competitionId!, eventDetails.endDateTime)}> Start Competition </Button>
                    <Typography color="error" variant="body2" align="center">
                        Submission deadline: {endDate +  " " + endTime}
                    </Typography>
                </div>
            );
        } else if (role===Role.ADMIN && eventDetails.competitionId) {
            return (
                <div className="flex flex-col items-center gap-2 mb-2 w-full">
                    <Button variant="contained" fullWidth onClick={handleMarkCompetition}> Mark Competition </Button>
                    <Typography color="error" variant="body2" align="center">
                        Submission deadline: {endDate +  " " + endTime}
                    </Typography>
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
    
    return (
        <>
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
                    {/* { role===Role.STUDENT &&isEventJoined && eventDetails.competitionId && ( */}
                    <div className="flex items-center gap-2 mb-2 mt-10">
                        {/* <Button variant="contained" fullWidth onClick={() => handleStartCompetition(eventDetails.competitionId!)}> Start Competition </Button> */}
                        {eventDetailsContentButton()}
                    </div>
                    {/* )} */}
                </div>
            </div>
            <Dialog open={markCompetitionDialogOpen} onClose={handleCloseMarkCompetitionDialog} fullWidth maxWidth="md">
                <MarkCompetitionDialog onClose={handleCloseMarkCompetitionDialog} competitionId={eventDetails.competitionId!} /> 
            </Dialog>
        </>
        
        
    );
};

export default EventDetailsContent;

