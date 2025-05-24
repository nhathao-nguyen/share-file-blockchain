const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    nftID: String,
    commenter: String,
    message: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;