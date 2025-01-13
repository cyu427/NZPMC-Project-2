import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";
import SignInDialog from "../auth/signin/SignInDialog";
import RegisterProvider from "../../states/register/RegisterProvider";
import RegisterDialog from "../auth/register/dialog/RegisterDialog";

const Navigation: React.FC = () => {
    const [loggedin, setLoggedin] = useState(false);
    const [openSignInDialog, setOpenSignInDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    
    const handleSignIn = () => {setOpenSignInDialog(true);}
    const handleCloseSignInDialog = () => {setOpenSignInDialog(false);}

    const handleRegister = () => {setOpenRegisterDialog(true);}
    const handleCloseRegisterDialog = () => {setOpenRegisterDialog(false);}

    const notLoggedInButtons = (
        <div className="flex gap-5 mr-4">
            <Button variant="outlined" size="medium" onClick={handleRegister}>
                Register
            </Button>

            <Button variant="contained" size="medium" onClick={handleSignIn}>
                Sign in
            </Button>
        </div>
    )

    const loggedInButtons = (
        <div>
            <Button variant="contained" size="medium">
                Sign out
            </Button>
        </div>
    )

    return (
        <>
            <div className="flex w-[1200px] pb-[20px] justify-between items-center">
                <h5 className="text-logo-blue primary ml-6 text-xl">
                    NZPMC
                </h5>

                <div>
                    { loggedin ? loggedInButtons : notLoggedInButtons }
                </div>
            </div>

            <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog} fullWidth maxWidth="sm">
                <SignInDialog onClose={handleCloseSignInDialog} />
            </Dialog> 

            <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog} fullWidth maxWidth="sm">
                <RegisterProvider>
                    <RegisterDialog onClose={handleCloseRegisterDialog} />
                </RegisterProvider>
            </Dialog>
        </>
    );
};

export default Navigation;
