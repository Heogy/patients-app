import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";

export default function PatientAppBar() {
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Patient List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
