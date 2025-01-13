import Carousel from "react-material-ui-carousel";
import EventCardModes from "../eventCard/utils/EventCardModes";
import EventOverviewType from "../eventCard/utils/EventOverviewType";
import { Box } from "@mui/material";
import EventCard from "../eventCard/EventCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface EventCarouselProps {
    events: EventOverviewType[];
    mode: EventCardModes;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events, mode }) => {
    const chunkEvents = (events: EventOverviewType[], size: number) => {
        const chunks = [];
        for (let i = 0; i < events.length; i += size) {
            chunks.push(events.slice(i, i + size));
        }
        return chunks;
    }

    if (events.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No events available at the moment</p>
            </div>
        );
    }

    const eventChunks = chunkEvents(events, 4);

    return (
        <Carousel
            indicators
            navButtonsAlwaysVisible
            autoPlay={false}
            NextIcon={<ArrowForwardIos sx={{ color: 'white' }} />}
            PrevIcon={<ArrowBackIos sx={{ color: 'white' }} />}
            navButtonsProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    zIndex: 2,
                },
            }}
            navButtonsWrapperProps={{
                style: { top: '50%', transform: 'translateY(-50%)' },
            }}
        >
        {eventChunks.map((chunk, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {chunk.map((event) => (
                    <EventCard
                        key={event.id}
                        name={event.name}
                        dateTime={event.dateTime}
                        location={event.location}
                        cost={event.cost}
                        mode={mode}
                    />
                ))}
            </Box>
        ))}
        </Carousel>
    );
};

export default EventCarousel;