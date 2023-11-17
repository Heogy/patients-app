import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Root from "./routes/Root";
import PatientTable from "./patients/PatientTable";
import PatientDetail from "./patients/PatientDetail";

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
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


function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
