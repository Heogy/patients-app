import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PatientTable from "./patients/PatientTable";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

const queryClient = new QueryClient()

function PatientAppBar() {
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Patient List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <PatientAppBar/>
                <PatientTable/>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
