import EventCarousel from "../../eventListOverview/eventCarousel/EventCarousel";
import EventCardModes from "../../eventListOverview/eventCard/utils/EventCardModes";
import { useGetEventsStudentsJoined } from "../../../services/events/useGetEventsStudentJoined";

interface StudentJoinedEventDialogContentProps {
    studentId: string;
}

const StudentJoinedEventDialogContent: React.FC<StudentJoinedEventDialogContentProps> = ({ studentId }) => {
    const { data: eventsStudentJoined, isLoading: isGetStudentEventLoading, isError: isGetStudentEventError } = useGetEventsStudentsJoined(studentId);
    if (isGetStudentEventLoading) return <div>Loading...</div>;
    if (isGetStudentEventError) return <div>Error...</div>;

    return (
        <>
            <EventCarousel events={eventsStudentJoined!} mode={EventCardModes.ADMIN} />
        </>
    );
};

export default StudentJoinedEventDialogContent;