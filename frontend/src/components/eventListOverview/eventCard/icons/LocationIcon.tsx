import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';

const LocationIcon: React.FC = () => {
    return (
        <div>
            <IconButton sx={{ pointerEvents: 'none' }}> {/* Adjust the size here */}
                <LocationOnIcon sx={{ fontSize: 30, color: 'black' }} />
            </IconButton>
        </div>
    );
};

export default LocationIcon;
