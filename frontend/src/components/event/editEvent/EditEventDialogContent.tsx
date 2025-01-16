import { Box, Button, DialogContent } from "@mui/material";
import EventNameField from "../../admin/events/createEvent/fields/EventNameField";
import EventDateTimeField from "../../admin/events/createEvent/fields/EventDateTimeField";
import EventLocationField from "../../admin/events/createEvent/fields/EventLocationField";
import EventCostField from "../../admin/events/createEvent/fields/EventCostField";
import EventDescriptionField from "../../admin/events/createEvent/fields/event-description/EventDescriptionField";
import { useGetEvent } from "../../../services/events/useGetEvent";
import { useForm } from "react-hook-form";
import { createEventSchema, CreateEventSchemaFormData } from "../../../schema/event/createEventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEvent } from "../../../services/events/useUpdateEvent";
import EventEndDateTimeField from "../../admin/events/createEvent/fields/EventEndDateTimeField";

interface EditEventDialogContentProps {
    onClose : () => void; 
    eventId: string;
}

const EditEventDialogContent: React.FC<EditEventDialogContentProps> = ({ onClose, eventId }) => {
    const { data: eventData } = useGetEvent(eventId);
    const { mutate: updateEvent } = useUpdateEvent();

    const { control, handleSubmit, formState: { errors } } = useForm<CreateEventSchemaFormData>({
        resolver: zodResolver(createEventSchema),
        defaultValues: eventData, // Prefill the form with existing event data
    });

    const onSubmit = (data: CreateEventSchemaFormData) => {
        updateEvent({ event: data, eventId }, {
            onSuccess: () => {
                onClose();
            },
        });
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <EventNameField control={control} errors={errors} />
                    <EventDateTimeField control={control} errors={errors} />
                    <EventEndDateTimeField control={control} errors={errors} />
                    <EventLocationField control={control} errors={errors} />
                    <EventCostField control={control} errors={errors} />
                    <EventDescriptionField control={control} errors={errors} />
                </Box>
          </DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </form>
    );
};

export default EditEventDialogContent;