import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../../Components/Admin/Listview/Listview.module.css";
import { HeaderAdmin, Menubar } from "../../Components/index";
import { Helmet } from 'react-helmet';

const postAdmin = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNfts = async () => {
            try {
                const response = await axios.get("/api/v1/nfts");
                console.log(response.data.data.nfts);
                setNfts(response.data.data.nfts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNfts();
    }, []);

    const deleteNft = async (nftId) => {
        try {
            const response = await axios.delete(`/api/v1/nfts/${nftId}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
                const nfts = response.data.data.nfts;
                console.log('Updated Nft List:', nfts);
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Error: User not found');
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Helmet>
                <title>Admin post dashboard</title>
            </Helmet>
            <HeaderAdmin />
            <Menubar />
            <center>
                <strong>
                    <h1>Post List</h1>
                </strong>
            </center>
            <table className={Style.userTable}>
                <thead>
                    <tr>
                        <th>Tile</th>
                        <th>Image</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {nfts.map(nft => (
                        <tr key={nft._id}>
                            <td>{nft.title}</td>
                            <td>
                            <img
                                className="image"
                                src={nft.image}
                                alt="image"
                                width={100}
                                height={100}
                            />
                            </td>
                            <td>{nft.address}</td>
                            <td>
                                <button
                                    className={Style.deleteButton}
                                    onClick={() => deleteNft(nft._id)}
                                >
                                    Delete
                                </button>
                                &emsp;
                                <button
                                    className={Style.blockButton}
                                    onClick={() => deleteNft(nft._id)}
                                >
                                    Block
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default postAdmin;
