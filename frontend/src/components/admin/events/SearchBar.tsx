import { TextField } from "@mui/material";

interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="flex justify-center mb-4">
            <TextField
                label="Search by event name"
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
            />
        </div>
    );
};

export default SearchBar;
