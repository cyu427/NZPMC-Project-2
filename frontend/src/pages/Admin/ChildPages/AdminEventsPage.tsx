import { Button, CircularProgress, Dialog, Pagination, Typography } from "@mui/material";
import { useGetAllEvents } from "../../../services/events/useGetAllEvents";
import EventCard from "../../../components/eventListOverview/eventCard/EventCard";
import EventCardModes from "../../../components/eventListOverview/eventCard/utils/EventCardModes";
import EventOverviewType from "../../../components/eventListOverview/eventCard/utils/EventOverviewType";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/admin/events/SearchBar"; 
import CreateEventDialog from "../../../components/admin/events/createEvent/CreateEventDialog";
import useJoinEventRerender from "../../../states/joinEvent/useJoinEventRerender";

const AdminEventPage: React.FC = () => {
    const { data: events, isLoading, isError, refetch: refetchAllEvents } = useGetAllEvents();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
    const handleCreateEvent = () => {setCreateEventDialogOpen(true);}
    const handleCloseCreateEventDialog = () => {setCreateEventDialogOpen(false);}

    const { rerenderState } = useJoinEventRerender();

    useEffect(() => {
        if (rerenderState) {
            // Refetch both events
            refetchAllEvents();
        }
    }, [rerenderState, refetchAllEvents]);

    const eventsPerPage = 12; // 4 events per row, 3 rows max

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <Typography color="error" align="center">
                Failed to load events.
            </Typography>
        );
    }

    // Filter events based on search term
    const filteredEvents = events?.filter((event: EventOverviewType) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginate filtered events
    const startIndex = (page - 1) * eventsPerPage;
    const paginatedEvents = filteredEvents?.slice(startIndex, startIndex + eventsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to the first page when the search term changes
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center my-4">
                    <Typography variant="h4" className="mb-4" sx={{ fontWeight: "bold" }}>
                        Events
                    </Typography>
                    <Button variant="contained" size="medium" onClick={handleCreateEvent}>
                        Create Event
                    </Button>
                </div>

                {/* Use SearchBar component */}
                <SearchBar value={searchTerm} onChange={handleSearchChange} />

                <div className="grid grid-cols-4 gap-4 justify-items-center">
                    {paginatedEvents && paginatedEvents.length > 0 ? (
                        paginatedEvents.map((event: EventOverviewType) => (
                            <div className="w-60" key={event.id}>
                                <EventCard
                                    name={event.name}
                                    dateTime={new Date(event.dateTime)}
                                    location={event.location}
                                    cost={event.cost}
                                    mode={EventCardModes.ADMIN}
                                    id={event.id}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">
                            No events available.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {filteredEvents && filteredEvents.length > eventsPerPage && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            count={Math.ceil((filteredEvents?.length || 0) / eventsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                )}
            </div>

            <Dialog open={createEventDialogOpen} onClose={handleCloseCreateEventDialog} fullWidth maxWidth="md">
                <CreateEventDialog onClose={handleCloseCreateEventDialog} refetchAllEvents={refetchAllEvents} /> 
            </Dialog>
        </>
    );
};

export default AdminEventPage;
