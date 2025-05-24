import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
// INTERNAL IMPORT
import { Header, Footer, Notification, Filter, Loader, Card } from "../Components";
import { useStateContext } from "../Context/NFTs";

const about = () => {
    // STATE VARIABLE
    const { loading} = useStateContext();
    const [notification, setNotification] = useState("");

    return (
        <div className="home">
            <Helmet>
                <title>About</title>
            </Helmet>
            <Header notification={notification} setNotification={setNotification} />
            {/* ABOUT */}
            <div className="about-content">
                <h2>About Us</h2>
                <p>Welcome to our website. Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
            <Footer />
            {/* // NOTIDICATION */}
            {notification != "" && (
                <Notification notification={notification} setNotification={setNotification} />
            )}
            {/* // LOADER */}
            {loading && (
                <div className="loader">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default about;
