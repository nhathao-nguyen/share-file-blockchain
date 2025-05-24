import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
    useAddress,
    useContract,
    useMetamask,
    useDisconnect,
    useSigner
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x5E78bd0f2bFc311411392ac90e67c1bd29f93315");
    const address = useAddress();
    const connect = useMetamask();

    // Frontend
    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBlance, setUserBlance] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            // User balance
            const balance = await signer?.getBalance();
            const userBalance = address ? ethers.utils.formatEther(balance?.toString()) : "";
            setUserBlance(userBalance);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Contract function
    // ---upload
    const uploadImage = async (imageInfo) => {
        const { title, description, email, category, image } = imageInfo;
        try {
            // Charge
            const listingPrice = await contract.call("listingPrice");
            const createNFTs = await contract.call(
                "uploadIPFS",
                [ address, image, title, description, email, category ],
                {
                    value: listingPrice.toString(),
                }
            );

            // API call
            const response = await axios({
                method: "POST",
                url: `/api/v1/nfts`,
                data: {
                    title: title,
                    description: description,
                    category: category,
                    image: image,
                    address: address,
                    email: email,
                },
            });

            console.log(response);
            console.info("contract call success", createNFTs);
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error("contract call failure", error);
        }
    };

    // ---Get contract data
    const getUploadedImages = async () => {
        // All images
        const images = await contract.call("getAllNFTs");

        // Total upload
        const totalUpload = await contract.call("imagesCount");
        
        // Listing price
        const listingPrice = await contract.call("listingPrice");
        const allImages = images.map((image, i) => ({
            owner: image.creator,
            title: image.title,
            description: image.description,
            email: image.email,
            category: image.category,
            fundraised: image.fundraised,
            image: image.image,
            imageID: image.id.toNumber(),
            createdAt: image.timestamp.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber(),
            comments: image.comments
        }));

        return allImages;
    };

    // ---Get contract data
    const getNFTsByCreator = async (address) => {
        // All images
        const images = await contract.call("getNFTsByCreator", [address]);

        // Total upload
        const totalUpload = await contract.call("imagesCount");
        
        // Listing price
        const listingPrice = await contract.call("listingPrice");
        const allImages = images.map((image, i) => ({
            owner: image.creator,
            title: image.title,
            description: image.description,
            email: image.email,
            category: image.category,
            fundraised: image.fundraised,
            image: image.image,
            imageID: image.id.toNumber(),
            createdAt: image.timestamp.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber(),
            comments: image.comments,
            donations: image.donations
        }));

        return allImages;
    };

    //--- Get single image
    const singleImage = async (id) => {
        try {
            const data = await contract.call("getImage", [id]);
            const image = {
                title: data[0],
                description: data[1],
                email: data[2],
                category: data[3],
                fundRaised: ethers.utils.formatEther(data[4].toString()),
                creator: data[5],
                imageURL: data[6],
                createdAt: data[7].toNumber(),
                imageId: data[8].toNumber(),
                comments: data[9],
                donations: data[10]
            };

            return image;
        } catch (error) {
            console.log(error);
        }
    };

    // Donate
    const donateFund = async ({ amount, Id }) => {
        try {
            console.log(amount, Id, address);
            const transaction = await contract.call("donateToImage", [Id, address], {
                value: amount.toString(),
            });
            console.log(transaction);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // Get api data
    const getAllNftsAPI = async () => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts`,
        });
        console.log(response.data);
    };

    // Get by creator api data
    const getNFTsByCreatorAPI = async (address) => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts/nftByCreator/${address}`,
        });
        console.log(response.data);
    };

    // Single NFTs api
    const getSingleNftsAPI = async (id) =>  {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts/${id}`,
        });
        console.log(response);
    };

    // Get all comments api
    const getAllCommentsAPI = async (id) =>  {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts/comments`,
        });
        console.log(response);
    };

    // Post create comment api
    const postCreateCommentsAPI = async ({nftID, commentor, content, image}) =>  {
        const response = await axios({
            method: "POST",
            url: `/api/v1/nfts/comments`,
            data: {
                nftID: nftID,
                commentor: commentor,
                content: content,
                image: image,
            },
        });
        console.log(response);
    };

    return (
        <StateContext.Provider 
        value={{ 
            // Contract
            address,
            contract,
            connect,
            disconnect,
            userBlance,
            setLoading,
            loading,
            // Function
            uploadImage,
            getUploadedImages,
            donateFund,
            singleImage,
            getNFTsByCreator,
            // API
            getAllNftsAPI,
            getNFTsByCreatorAPI,
            getSingleNftsAPI,
            getAllCommentsAPI,
            postCreateCommentsAPI,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
