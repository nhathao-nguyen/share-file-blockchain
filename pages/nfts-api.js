import React, { useState } from "react";
import { Helmet } from 'react-helmet';
// INTERNAL IMPORT
import { Header, Footer, Notification, Logo, Loader } from "../Components";
import { useStateContext } from "../Context/NFTs";

const nftsapi = () => {
  // STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");
  const apiEndpoint = [
    {
      title: "Get all NFTs",
      description: "Welcome to NFTs API, get access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Get single NFTs",
      description: "Single NFTs API endpoint, get access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs/Id",
    },
    {
      title: "Get NFTs by creator",
      description: "Get NFTs by creator NFTs API endpoint, get access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs/nftByCreator/address",
    },
    {
      title: "Create image upload",
      description: "This endpoint will allow you to make post request on the server to upload the IMAGE",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Login endpoint",
      description: "Allow api user to use the NFTs API authentication, to log user in",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/login",
    },
    {
      title: "SingUp endpoint",
      description: "Allow api user to use the NFTs API for creating account, to signup user",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/signup",
    }
  ];

  return (
    <div className="home">
      <Helmet>
        <title>NFTs API</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>How to use NFTs API</h1>
      </div>
      <div className="api-body">
        {apiEndpoint.map((api, i) => (
          <div className="api-left">
            <h3 className="api-title">{api.title}</h3>
            <p>{api.description}</p>
            <p>Method: {api.method}</p>
            <p>Endpoint: {api.endpoint}</p>
          </div>
        ))}
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

export default nftsapi;
