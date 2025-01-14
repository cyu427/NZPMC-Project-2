import { useEffect } from "react";
import EventCardModes from "../../components/eventListOverview/eventCard/utils/EventCardModes";
import EventSection from "../../components/eventListOverview/EventSection";
import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import { useGetEventsStudentsJoined } from "../../services/events/useGetEventsStudentJoined";
import useAuth from "../../states/auth/useAuth";
import { useGetEventsStudentNotJoined } from "../../services/events/useGetEventsStudentNotJoined";
import EventOverviewType from "../../components/eventListOverview/eventCard/utils/EventOverviewType";
import { Typography } from "@mui/material";
import useJoinEventRerender from "../../states/joinEvent/useJoinEventRerender";

const LandingPageSignedIn: React.FC = () => {
    const { rerenderState } = useJoinEventRerender();
    const { userId, role } = useAuth();
    const {
        data: eventsJoined,
        isLoading: isLoadingEventsJoined,
        isError: isErrorEventsJoined,
        refetch: refetchEventsJoined
    } = useGetEventsStudentsJoined(userId!);

    const {
        data: eventsNotJoined,
        isLoading: isLoadingEventsNotJoined,
        isError: isErrorEventsNotJoined,
        refetch: refetchEventsNotJoined
    } = useGetEventsStudentNotJoined(userId!);

    useEffect(() => {
        if (rerenderState) {
            // Refetch both events
            refetchEventsJoined();
            refetchEventsNotJoined();
            console.log("Refetching events");
        }
    }, [rerenderState, refetchEventsJoined, refetchEventsNotJoined]);

    const renderEventSection = (
        title: string,
        events: EventOverviewType[],
        isLoading: boolean,
        isError: boolean,
        mode: EventCardModes
    ) => {
        if (isLoading) {
            return <div>Loading Events...</div>;
        }

        if (isError) {
            return <div>Error loading events</div>;
        }

        if (mode === EventCardModes.USER_NOT_JOINED && events.length === 0) {
            return (
                <div>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', my: 2 }}>
                        Upcoming Events (Not joined)
                    </Typography>
                    <p className="my-28 text-lg"> No upcoming events that you have not joined </p>
                </div>
            );
        }

        if (mode === EventCardModes.USER_JOINED && events.length === 0) {
            return (
                <div>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', my: 2 }}>
                        Upcoming Events (Join)
                    </Typography>
                    <p className="my-28 text-lg"> You are not joined in any events </p>
                </div>
            );
        }

        return <EventSection title={title} events={events} mode={mode} />;
    };


    return (
        <div className="w-[1200px] h-screen">
            <div className="top-0"> <Navigation /> </div>
            <UserProfileCard />
            <div>
                {renderEventSection("Upcoming Events (Not Joined)", eventsNotJoined || [], isLoadingEventsJoined, isErrorEventsJoined, EventCardModes.USER_NOT_JOINED)}
            </div>
            <div>
                {renderEventSection("Upcoming Events (Joined)", eventsJoined || [], isLoadingEventsJoined, isErrorEventsJoined, EventCardModes.USER_JOINED)}
            </div>
            <Footer />
        </div>
    );
};
  
export default LandingPageSignedIn;