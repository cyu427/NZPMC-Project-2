import { useForm } from "react-hook-form";
import { createCompetitionSchema, CreateCompetitionSchemaFormData } from "../../../../schema/competition/createCompetitionSchema";
import { useCreateCompetition } from "../../../../services/competition/useCreateCompetition";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DialogContent } from "@mui/material";
import TitleField from "./fields/TitleField";

interface CreateCompetitionDialogContentProps {
    onClose : () => void; 
    refetchAllCompetitions: () => void;
}

const CreateCompetitionDialogContent: React.FC<CreateCompetitionDialogContentProps> = ({ onClose, refetchAllCompetitions }) => {
    const { mutate: createCompetition } = useCreateCompetition();

    const { control, handleSubmit, formState: { errors } } = useForm<CreateCompetitionSchemaFormData>({
        resolver: zodResolver(createCompetitionSchema),
    });
    
    const onSubmit = (data: CreateCompetitionSchemaFormData) => {
        createCompetition(data, {
            onSuccess: () => {
                refetchAllCompetitions();
                onClose();
            },
        });
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <div className="flex flex-col gap-1">
                <TitleField control={control} errors={errors} />
            </div>
        </DialogContent>
        <div className="flex justify-end p-3">
            <Button type="submit" variant="contained" color="primary">
                Create Competition
            </Button>
        </div>
    </form>
    );
};

export default CreateCompetitionDialogContent;