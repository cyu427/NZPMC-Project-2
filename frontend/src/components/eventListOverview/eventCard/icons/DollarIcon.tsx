import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { IconButton } from '@mui/material';

const DollarIcon: React.FC = () => {
    return (
        <div>
            <IconButton sx={{ pointerEvents: 'none' }}> {/* Adjust the size here */}
                <AttachMoneyIcon sx={{ fontSize: 30, color: 'black' }} />
            </IconButton>
        </div>
    );
};

export default DollarIcon;
