import { TextField } from "@mui/material";

interface SearchBarProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    width: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, label, width }) => {
    return (
        <div className="flex justify-center mb-4">
            <TextField
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
                sx={{ width }}
            />
        </div>
    );
};

export default SearchBar;
