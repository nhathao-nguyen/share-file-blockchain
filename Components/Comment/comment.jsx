import React, { useEffect, useState } from "react";
import Image from "next/image";
// INTERNAL IMPORT
import Style from "./Comment.module.css";
import images from "../Image/client/index";
import { useStateContext } from "../../Context/NFTs";
import axios from "axios";

const Comment = ({ image }) => {
    const { address } = useStateContext();
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/v1/comment/${image.imageId}`);
                setComments(response.data.data.comments);
            } catch (err) {
                console.error("Failed to load comments:", err);
                setError("Failed to load comments");
            }
        };

        fetchComments();
    }, [image.imageId]);

    const handlePostComment = async () => {
        if (comment.trim() === "") return;
        setLoading(true);
        try {
            const response = await axios.post(`/api/v1/comment/${image.imageId}`, {
                nftID: image.imageId,
                commenter: address,
                message: comment,
            });
            setComments(prevComments => [...prevComments, response.data.data.comment]);
            setComment("");
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setComment("");
    };

    const getClientImageIndex = (index) => {
        return `client${(index % 11) + 1}`;
    };

    return (
        <div className={Style.postcontainer}>
            {error && <p className={Style.error}>{error}</p>} {/* Display error if any */}
            {comments.map((comment, i) => (
                <div key={i}>
                    <div className={Style.postheader}>
                        <Image
                            className={Style.profilepic}
                            src={images[getClientImageIndex(i)]}
                            width={80}
                            height={80}
                            onClick={() => setOpenProfile(true)}
                        />
                        <div className={Style.postinfo}>
                            <h3>{comment.commenter}</h3>
                            <p>Commented publicly - {new Date(comment.createdAt * 1000).toDateString()}</p>
                        </div>
                    </div>
                    <div className={Style.postcontent}>
                        <p>{comment.message}</p>
                    </div>
                    <div className={Style.postactions}>
                        <p>Like</p>
                        <p>Comment</p>
                        <p>Share</p>
                    </div>
                </div>
            ))}
            <div className={Style.commentsection}>
                <textarea
                    placeholder="Message"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className={Style.commentbuttons}>
                    <button
                        className={Style.postbtn}
                        onClick={handlePostComment}
                        disabled={loading}
                    >
                        {loading ? "Posting..." : "POST COMMENT"}
                    </button>
                    <button
                        className={Style.cancelbtn}
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
