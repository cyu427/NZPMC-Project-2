import { useForm } from "react-hook-form";
import { createEventSchema, CreateEventSchemaFormData } from "../../../../schema/event/createEventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEvent } from "../../../../services/events/useCreateEvent";
import { Button, DialogContent } from "@mui/material";
import EventNameField from "./fields/EventNameField";
import EventLocationField from "./fields/EventLocationField";
import EventDateTimeField from "./fields/EventDateTimeField";
import EventCostField from "./fields/EventCostField";
import EventDescriptionField from "./fields/event-description/EventDescriptionField";

interface CreateEventDialogContentProps {
    onClose : () => void; 
    refetchAllEvents: () => void;
}

const CreateEventDialogContent: React.FC<CreateEventDialogContentProps> = ({ onClose, refetchAllEvents }) => {
    const { mutate: createEvent } = useCreateEvent();

    const { control, handleSubmit, formState: { errors } } = useForm<CreateEventSchemaFormData>({
        resolver: zodResolver(createEventSchema),
    });

    const onSubmit = (data: CreateEventSchemaFormData) => {
        createEvent(data, {
            onSuccess: () => {
                refetchAllEvents();
                onClose();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <div className="flex flex-col gap-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EventNameField control={control} errors={errors} />
                        <EventDateTimeField control={control} errors={errors} />
                        <EventLocationField control={control} errors={errors} />
                        <EventCostField control={control} errors={errors} />
                        <EventDescriptionField control={control} errors={errors} />
                    </form>
                </div>
            </DialogContent>
            <div className="flex justify-end p-3">
                <Button type="submit" variant="contained" color="primary">
                    Create Event
                </Button>
            </div>
        </form>
    );
};

export default CreateEventDialogContent;