import EventCardModes from "../../components/eventListOverview/eventCard/utils/EventCardModes";
import EventSection from "../../components/eventListOverview/EventSection";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navigation from "../../components/navigation/Navigation";
import { useGetAllEvents } from "../../services/events/useGetAllEvents";

const LandingPage: React.FC = () => {
    const { data: events, isLoading, isError } = useGetAllEvents();

    return (
        <div className="w-[1200px] h-screen">
            <div className="top-0"> <Navigation /> </div>
            <Hero />
            <div>
                {isLoading && <div>Loading Events...</div>}
                {isError && <div>Error loading events</div>}
                {events && !isLoading && !isError && (
                    <EventSection 
                        title="Upcoming Events" 
                        events={events} 
                        mode={EventCardModes.NOT_LOGGED_IN} 
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};
  
export default LandingPage;