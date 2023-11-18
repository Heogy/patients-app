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
                    <Typography variant="h6" component="div" sx={{flexGrow: 2}}>
                        Patient List
                    </Typography>
                    {!authContextProps.user &&
                        <Link to="/login" style={{
                            color: 'white',
                        }}>
                            <Button color='inherit' data-cy='login-button'>Login</Button>
                        </Link>}
                    {authContextProps.user &&
                        <Link to="/login" style={{
                            color: 'white',
                        }}>
                            <Button color='inherit' onClick={handleLogout} data-cy={'logout-button'}>Logout</Button>
                        </Link>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
