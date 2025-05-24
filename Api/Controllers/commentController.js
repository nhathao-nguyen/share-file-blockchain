const Comment = require("../Model/commentModel");

exports.getAllComments = async (req, res, next) => {
    const nftid = req.params.nftid;

    const comments = await Comment.find({ nftID: nftid });

    // Send response
    res.status(200).json({
        status: "success",
        results: comments.length,
        data: {
            comments,
        },
    });
};

exports.getAlllComments = async (req, res, next) => {

    const comments = await Comment.find();

    // Send response
    res.status(200).json({
        status: "success",
        results: comments.length,
        data: {
            comments,
        },
    });
};

exports.createComment = async (req, res, next) => {
    const nftid = req.params.nftid;
    const newComment = await Comment.create(req.body);

    // Send response
    res.status(201).json({
        status: "success",
        data: {
            comment: newComment,
        },
    });
};

exports.deleteComment = async (req, res, next) => {
    try {
        const CommentId = req.params.id;
        const comment = await Comment.findByIdAndDelete(CommentId);

        if (!comment) {
            return res.status(404).json({
                status: "fail",
                message: "Comment not found",
            });
        }

        const comments = await Comment.find();

        res.status(200).json({
            status: "success",
            data: {
                comments
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};