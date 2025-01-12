import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Navigation: React.FC = () => {
    const [ loggedin, setLoggedin ] = useState(false);

    const notLoggedInButtons = (
        <div style={{ display: 'flex', gap: '20px' }}>
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
        <div style={{ display: 'flex', width: '1200px', justifyContent: 'space-between', alignItems: 'center'}}>
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