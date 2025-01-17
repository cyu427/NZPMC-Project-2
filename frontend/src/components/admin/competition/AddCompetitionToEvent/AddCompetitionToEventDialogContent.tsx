import { GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useState } from "react";
import AdminDataTable from "../../utils/AdminDataTable";
import SearchBar from "../../utils/SearchBar";
import { useGetAllEvents } from "../../../../services/events/useGetAllEvents";
import { useAddCompetitionToEvent } from "../../../../services/competition/useAddCompetitionToEvent";
import EventOverviewType from "../../../eventListOverview/eventCard/utils/EventOverviewType";
import { useRemoveCompetitionFromEvent } from "../../../../services/competition/useRemoveCompetitionFromEvent";

interface AddCompetitionToEventDialogContentProps {
    competitionId: string;
}

const AddCompetitionToEventDialogContent: React.FC<AddCompetitionToEventDialogContentProps> = ({ competitionId }) => {
    const { mutate: addCompetitionToEvent } = useAddCompetitionToEvent();
    const { mutate: removeCompetitionFromEvent } = useRemoveCompetitionFromEvent();
    const { data: allEvents, refetch: refetchAllEvents } = useGetAllEvents();
    console.log("All events:", allEvents);

    const handleAdd = (eventId: string ) => {
        addCompetitionToEvent({competitionId, eventId}, {
            onSuccess: () => {
                refetchAllEvents();
            },
        });
    };

    const handleRemove = (eventId: string) => {
        removeCompetitionFromEvent({competitionId, eventId,}, {
            onSuccess: () => {
                refetchAllEvents();
            }
        })
    }

    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredEvents = allEvents?.filter((event: EventOverviewType) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const columns = [
        { field: 'name', headerName: 'Events', width: 580 },
        {
            field: 'details',
            headerName: 'Add/Remove from Event',
            width: 270,
            renderCell: (params: GridRenderCellParams) => {
                if (params.row.competitionId === competitionId) {
                    return (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleRemove(params.row.id)}
                        >
                            Remove
                        </Button>
                    );
                } else if (params.row.competitionId !== null) {
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled
                        >
                           Have another competition
                        </Button>
                    );      
                } else {
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAdd(params.row.id)}
                        >
                            Add
                        </Button>
                    );
                }
            }
        },
    ];

    return (
        <div className="mt-2">
            <SearchBar label="Search by Event name" value={searchTerm} onChange={handleSearchChange} width="1200px" />
            <AdminDataTable columns={columns} rows={filteredEvents} height={630} width={850}/>
        </div>
    );
};

export default AddCompetitionToEventDialogContent;