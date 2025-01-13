import Typography from '@mui/material/Typography';
import LocationIcon from '../icons/LocationIcon';

interface LocationSectionProps {
    location: string; 
}

const LocationSection: React.FC<LocationSectionProps> = ({ location: location}) => {
    return (
        <div className="flex items-center"> 
            <LocationIcon /> 
            <Typography variant="body2" sx={{ color: 'text.primary', marginLeft: 1, fontSize: 16, textAlign: 'left' }}> 
                {location}
            </Typography>
        </div>
    );
};

export default LocationSection;
