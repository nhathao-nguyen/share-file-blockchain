const express = require("express");
const nftController = require("../Controllers/nftController");
const router = express.Router();

router.route("/").get(nftController.getAllNfts).post(nftController.createNft);
router.route("/:id").get(nftController.getNft);
router.route("/:id").delete(nftController.deleteNft);
router.route("/nftByCreator/:address").get(nftController.getNftsByCreator);

module.exports = router;