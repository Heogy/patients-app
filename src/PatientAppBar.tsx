import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";

export default function PatientAppBar() {
    let authContextProps = useAuth();
    const handleLogout = () => {
        authContextProps.logout();
    };
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 12}}>
                        Patient List
                    </Typography>
                    <Typography variant="body1" component="div" sx={{flexGrow: 1}}>
                        logged as {authContextProps.user?.username}
                    </Typography>
                    {!authContextProps.user &&
                        <Link to="/login" style={{
                            color: 'white',
                        }}>
                            <Button color='inherit'>Login</Button>
                        </Link>}
                    {authContextProps.user &&
                        <Button color='inherit' onClick={handleLogout}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
