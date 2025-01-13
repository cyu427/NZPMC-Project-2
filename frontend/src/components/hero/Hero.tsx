import { Button, Dialog, styled, Typography } from "@mui/material";
import { useState } from "react";
import SignInDialog from "../auth/signin/SignInDialog";

const Hero: React.FC = () => {

    const HighlightedText = styled('span')({
        color: '#FFD700',
    })

    const [openSignInDialog, setOpenSignInDialog] = useState(false);
        
        const handleSignIn = () => {setOpenSignInDialog(true);}
        const handleCloseSignInDialog = () => {setOpenSignInDialog(false);}

    return (
        <>
            <div className="w-[1200px] h-[400px] bg-dark-blue text-white">
                <div className="flex flex-col justify-center items-center h-full">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                        Welcome to <HighlightedText>NZPMC</HighlightedText>
                    </Typography>

                    <p className="text-2xl font-normal mb-10">
                        All-in-one portal for NZPMC event registration and payment
                    </p>

                    <div> 
                        <Button variant="outlined" sx={{width: '120px', height: '70px', marginRight: '150px', color: '#1864c4', backgroundColor: 'white'}}>
                            Register
                        </Button>
                        <Button variant="contained" onClick={handleSignIn} sx={{width: '120px', height: '70px'}}>
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog} fullWidth maxWidth="sm">
                <SignInDialog onClose={handleCloseSignInDialog} />
            </Dialog>

        </>
    );
};

export default Hero;