import PatientAppBar from "../PatientAppBar";
import {Outlet} from "react-router-dom";
export default function Root() {
    return (
        <div>
            <PatientAppBar/>
            <Outlet/>
        </div>
    )
}
