import { Button } from "@mui/material";

interface EventButtonGroupProps {
    leftLabel: string;
    rightLabel: string;
    // onLeftClick: () => void;
    // onRightClick: () => void;
}

const EventButtonGroup: React.FC<EventButtonGroupProps> = ({ leftLabel, rightLabel }) => {
    return (
        <div className="flex gap-2 ">
            <Button variant="outlined" fullWidth sx={{ fontSize: "10px", padding: "2px 2px", height: "40px"}}>
                {leftLabel}
            </Button>
            <Button variant="contained" fullWidth sx={{ fontSize: "10px", padding: "4px 2px", height: "40px" }}>
                {rightLabel}
            </Button>
        </div>
    );
};

export default EventButtonGroup;