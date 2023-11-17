import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Root from "./routes/Root";
import PatientTable from "./patients/PatientTable";
import PatientDetail from "./patients/PatientDetail";
import LoginPage from "./routes/LoginPage";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./AuthProvider";

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,

        children: [
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "patients",
                element: <PatientTable/>,

            },
            {
                path: "patients/:patientId",
                element: <PatientDetail/>,
            }
        ],
    },
]);

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#034481',
        },
        secondary: {
            main: '#8e5605',
        },
    },
});

function App() {
    return (
        <React.StrictMode>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router}/>
                    </QueryClientProvider>
                </ThemeProvider>
            </AuthProvider>
        </React.StrictMode>
    );
}

export default App;
