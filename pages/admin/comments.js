import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../../Components/Admin/Listview/Listview.module.css";
import { HeaderAdmin, Menubar } from "../../Components/index";
import { Helmet } from 'react-helmet';

const commentAdmin = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/v1/comment/");
                console.log(response.data.data.comments);
                setComments(response.data.data.comments);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`/api/v1/comment/${commentId}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
                const comments = response.data.data.comments;
                console.log('Updated Comment List:', comments);
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
                <title>Admin comment dashboard</title>
            </Helmet>
            <HeaderAdmin />
            <Menubar />
            <center>
                <strong>
                    <h1>Comment List</h1>
                </strong>
            </center>
            <table className={Style.userTable}>
                <thead>
                    <tr>
                        <th>Commenter</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment._id}>
                            <td>{comment.commenter}</td>
                            <td>{comment.message}</td>
                            <td>
                                <button
                                    className={Style.deleteButton}
                                    onClick={() => deleteComment(comment._id)}
                                >
                                    Delete
                                </button>
                                &emsp;
                                <button
                                    className={Style.blockButton}
                                    onClick={() => deleteComment(comment._id)}
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

export default commentAdmin;
