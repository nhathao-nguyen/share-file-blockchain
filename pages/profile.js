import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Header, Footer, Notification, Loader, Card2 } from "../Components";
import { useStateContext } from "../Context/NFTs";

const Profile = () => {
    const { loading, getNFTsByCreator, address, contract, getNFTsByCreatorAPI } = useStateContext();
    const [notification, setNotification] = useState("");
    const [allImages, setAllImages] = useState([]);
    const [user, setUser] = useState(null);

    const fetchImages = async () => {
        const images = await getNFTsByCreator(address);
        setAllImages(images);
        console.log(images);

        // API NFTs
        const apiImages = await getNFTsByCreatorAPI();
    };

    useEffect(() => {
        if (contract) fetchImages();
    }, [address, contract]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("NFTApi User"));
        setUser(user);
    }, []);

    return (
        <div className="home">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Header notification={notification} setNotification={setNotification} />
            <h1>PROFILE</h1>
            <div className="content-profile">
                {user && (
                    <div className="info-profile">
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                    </div>
                )}
                <div className="card-profile">
                    {allImages.length === 0 ? (
                        <Loader />
                    ) : allImages === undefined ? (
                        <h1>No images</h1>
                    ) : (
                        allImages.map((image, i) => (
                            <Card2 key={i + 1} index={i} image={image} setNotification={setNotification} />
                        ))
                    )}
                </div>
            </div>
            <Footer />
            {notification && (
                <Notification notification={notification} setNotification={setNotification} />
            )}
            {loading && (
                <div className="loader">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default Profile;
