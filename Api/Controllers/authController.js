const User = require("../Model/userModel");
const NFT = require("../Model/nftModel");

const jwt = require("jsonwebtoken");

exports.getAllusers = async (req, res, next) => {
    try {
        const users = await User.find();
        const usersWithNFTCount = [];

        for (const user of users) {
            const nftCount = await NFT.countDocuments({ address: user.address });
            usersWithNFTCount.push({
                ...user.toObject(),
                nftCount,
            });
        }

        res.status(200).json({
            status: "success",
            results: usersWithNFTCount.length,
            data: {
                users: usersWithNFTCount,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        const users = await User.find();

        res.status(200).json({
            status: "success",
            data: {
                users
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    // Remove password from output
    user.password = undefined;
    
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        }
    });
};

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        address: req.body.address
    });

    createSendToken(newUser, 201, req, res);
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide email and password!",
        })
    }

    // 2) Check if email and password correct
    const user = await User.findOne({email}).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            status: "fail",
            message: "Incorrect provide email or password",
        })
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 201, req, res);
}