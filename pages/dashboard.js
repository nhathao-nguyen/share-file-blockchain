import React from "react";
import { HeaderAdmin, Menubar } from "../Components/index";
import { Helmet } from 'react-helmet';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Admin dashboard</title>
            </Helmet>
            <HeaderAdmin />
            <Menubar />
        </>
    );
}

export default Dashboard;