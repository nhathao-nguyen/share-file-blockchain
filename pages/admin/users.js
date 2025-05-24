import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../../Components/Admin/Listview/Listview.module.css";
import { HeaderAdmin, Menubar } from "../../Components/index";
import { Helmet } from 'react-helmet';

const userAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/v1/user");
                console.log(response.data.data.users);
                setUsers(response.data.data.users);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/api/v1/user/${userId}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
                const users = response.data.data.users;
                console.log('Updated User List:', users);
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
                <title>Admin user dashboard</title>
            </Helmet>
            <HeaderAdmin />
            <Menubar />
            <center>
                <strong>
                    <h1>User List</h1>
                </strong>
            </center>
            <table className={Style.userTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Address</th>
                        <th>Nfts</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.address}</td>
                            <td>{user.nftCount}</td>
                            <td>
                                <button
                                    className={Style.deleteButton}
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                                &emsp;
                                <button
                                    className={Style.blockButton}
                                    onClick={() => deleteUser(user._id)}
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

export default userAdmin;
