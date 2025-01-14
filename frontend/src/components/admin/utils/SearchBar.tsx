import { TextField } from "@mui/material";

interface SearchBarProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, label }) => {
    return (
        <div className="flex justify-center mb-4">
            <TextField
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
                sx={{ width: "1200px" }}
            />
        </div>
    );
};

export default SearchBar;
