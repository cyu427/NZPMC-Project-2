import { Button, styled, Typography } from "@mui/material";

const Hero: React.FC = () => {

    const HighlightedText = styled('span')({
        color: '#FFD700',
    })

    return (
        <div className="w-[1200px] h-[400px] bg-dark-blue text-white">
            <div className="flex flex-col justify-center items-center h-full">
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    Welcome to <HighlightedText>NZPMC</HighlightedText>
                </Typography>

                <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
                    All-in-one portal for NZPMC event registration and payment
                </Typography>

                <div> 
                    <Button variant="outlined" sx={{width: '120px', height: '70px', marginRight: '150px', color: '#1864c4', backgroundColor: 'white'}}>
                        Register
                    </Button>
                    <Button variant="contained" sx={{width: '120px', height: '70px'}}>
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;