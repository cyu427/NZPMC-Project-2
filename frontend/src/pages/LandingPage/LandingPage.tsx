import EventCardModes from "../../components/eventListOverview/eventCard/utils/EventCardModes";
import EventOverviewType from "../../components/eventListOverview/eventCard/utils/EventOverviewType";
import EventSection from "../../components/eventListOverview/EventSection";
import Hero from "../../components/hero/Hero";
import Navigation from "../../components/navigation/Navigation";

const events: EventOverviewType[] = [
    {
        id: "1",
        name: "Tech Conference 2025",
        dateTime: new Date("2025-03-10T09:00:00"),
        location: "Auckland Convention Centre",
        cost: "$50",
        description: "A conference focusing on the latest in tech and innovation."
    },
    {
        id: "2",
        name: "Winter Coding Bootcamp",
        dateTime: new Date("2025-06-01T10:00:00"),
        location: "Auckland University",
        cost: "$200",
        description: "A coding bootcamp for students and professionals looking to level up their coding skills."
    },
    {
        id: "3",
        name: "Startup Weekend",
        dateTime: new Date("2025-05-15T18:00:00"),
        location: "TechHub Auckland",
        cost: "$30",
        description: "A weekend hackathon event for aspiring entrepreneurs to build and launch startups."
    },
    {
        id: "4",
        name: "AI & Machine Learning Workshop",
        dateTime: new Date("2025-04-20T08:30:00"),
        location: "Auckland Tech Park",
        cost: "$100",
        description: "A hands-on workshop where you can learn about AI, ML, and how to implement them in projects."
    },
    {
        id: "5",
        name: "UX/UI Design Seminar",
        dateTime: new Date("2025-07-25T14:00:00"),
        location: "Auckland Design Studio",
        cost: "$75",
        description: "A seminar focused on the principles of UX/UI design for better user experiences."
    },
    {
        id: "6",
        name: "Cloud Computing Conference",
        dateTime: new Date("2025-09-05T11:00:00"),
        location: "Auckland Conference Centre",
        cost: "$120",
        description: "A deep dive into the latest cloud technologies and strategies for scaling your business."
    },
    {
        id: "7",
        name: "Blockchain Summit",
        dateTime: new Date("2025-08-15T13:00:00"),
        location: "Auckland Convention Centre",
        cost: "$150",
        description: "A summit focusing on the future of blockchain, cryptocurrency, and decentralized systems."
    },
    {
        id: "8",
        name: "Cybersecurity Awareness Training",
        dateTime: new Date("2025-10-10T09:00:00"),
        location: "Auckland Tech Hub",
        cost: "$60",
        description: "A training session aimed at helping individuals and companies strengthen their cybersecurity practices."
    }
];


const LandingPage: React.FC = () => {
    return (
        <div className="w-[1200px] h-screen">
            <div className="top-0">
                <Navigation />
            </div>
            <Hero />
            <EventSection title="Upcoming Events" events={events} mode={EventCardModes.NOT_LOGGED_IN} />
        </div>
    );
};
  
export default LandingPage;