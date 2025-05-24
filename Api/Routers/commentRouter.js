const express = require("express");
const commentController = require("../Controllers/commentController");
const router = express.Router();

router.route("/:nftid").get(commentController.getAllComments).post(commentController.createComment);
router.route("/").get(commentController.getAlllComments);
router.route("/:commentId").delete(commentController.deleteComment);

module.exports = router;