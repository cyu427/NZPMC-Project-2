import Typography from '@mui/material/Typography';
import DollarIcon from '../icons/DollarIcon';

interface CostSectionProps {
    cost: string; // The prop for custom date and time
}

const CostSection: React.FC<CostSectionProps> = ({ cost: cost}) => {
    return (
        <div className="flex items-center"> 
            <DollarIcon /> 
            <Typography variant="body2" sx={{ color: 'text.primary', marginLeft: 1, fontSize: 16 }}>
                {cost}
            </Typography>
        </div>
    );
};

export default CostSection;
