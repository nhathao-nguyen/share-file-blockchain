const NFT = require("../Model/nftModel");

exports.getAllNfts = async (req, res, next) => {
    const nfts = await NFT.find();

    // Send response
    res.status(200).json({
        status: "success",
        results: nfts.length,
        data: {
            nfts,
        },
    });
};

exports.getNft = async (req, res, next) => {
    const nft = await NFT.findById(req.params.id);

    // Send response
    res.status(200).json({
        status: "success",
        data: {
            nft,
        },
    });
};

exports.getNftsByCreator = async (req, res, next) => {
    try {
        const creatorAddress = req.params.address;

        // Find NFTs by creator address
        const nfts = await NFT.find({ address: creatorAddress });

        // Send response
        res.status(200).json({
            status: "success",
            results: nfts.length,
            data: {
                nfts,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

exports.createNft = async (req, res, next) => {
    console.log(req.body);
    const newNft = await NFT.create(req.body);

    // Send response
    res.status(201).json({
        status: "success",
        data: {
            nft: newNft,
        },
    });
};


exports.deleteNft = async (req, res, next) => {
    try {
        const nftId = req.params.id;
        const nft = await NFT.findByIdAndDelete(nftId);

        if (!nft) {
            return res.status(404).json({
                status: "fail",
                message: "Nft not found",
            });
        }

        const nfts = await NFT.find();

        res.status(200).json({
            status: "success",
            data: {
                nfts
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};