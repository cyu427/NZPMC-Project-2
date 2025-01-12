import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Navigation: React.FC = () => {
    const [loggedin, setLoggedin] = useState(false);

    const notLoggedInButtons = (
        <div className="flex gap-5">
            <Button variant="outlined" size="medium">
                Register
            </Button>

            <Button variant="contained" size="medium">
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
        <div className="flex w-[1200px] justify-between items-center">
            <Typography variant="h6" component="div" sx={{ color: 'primary.main' }}>
                NZPMC
            </Typography>

            <div>
                { loggedin ? loggedInButtons : notLoggedInButtons }
            </div>
        </div>
    );
};

export default Navigation;
