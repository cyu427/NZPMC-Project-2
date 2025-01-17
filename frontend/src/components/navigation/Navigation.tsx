import { Button, Dialog, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import SignInDialog from "../auth/signin/SignInDialog";
import RegisterProvider from "../../states/register/RegisterProvider";
import RegisterDialog from "../auth/register/dialog/RegisterDialog";
import useAuth from "../../states/auth/useAuth";
import { useLocation, useNavigate } from "react-router";
import Role from "../../utils/Role";

const Navigation: React.FC = () => {
    const { isLoggedIn, logout, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [openSignInDialog, setOpenSignInDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    
    const handleSignIn = () => {setOpenSignInDialog(true);}
    const handleCloseSignInDialog = () => {setOpenSignInDialog(false);}

    const handleRegister = () => {setOpenRegisterDialog(true);}
    const handleCloseRegisterDialog = () => {setOpenRegisterDialog(false);}

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        switch (newValue) {
            case 0:
                navigate('/admin/event');  // Navigate to /events
                break;
            case 1:
                navigate('/admin/competition');  // Navigate to /competition
                break;
            case 2:
                navigate('/admin/question');  // Navigate to /question
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // Sync the active tab with the current route when the component mounts
        console.log(location.pathname);
        switch (location.pathname) {
            case '/admin/event':
                setSelectedTab(0);
                break;
            case '/admin/competition':
                setSelectedTab(1);
                break;
            case '/admin/question':
                setSelectedTab(2);
                break;
            default:
                setSelectedTab(0); // Default to the first tab if no match
                break;
        }
    }, [location.pathname]);  // This will run when the path changes


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
            <Button variant="contained" size="medium" onClick={handleLogout}>
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
                <div className="flex-grow flex justify-end mr-20">
                    {role === Role.ADMIN && (
                        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="navigation tabs">
                            <Tab label="Events" />
                            <Tab label="Competition" />
                            <Tab label="Question" />
                        </Tabs>
                    )}
                </div>

                <div>
                    
                    { isLoggedIn ? loggedInButtons : notLoggedInButtons }
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
