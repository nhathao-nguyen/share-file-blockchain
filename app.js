const express = require("express");
const cors = require("cors");

const nftRouter = require("./Api/Routers/nftRouter");
const userRouter = require("./Api/Routers/userRouter");
const commentRouter = require("./Api/Routers/commentRouter");

//MIDDLEWARE
const app = express();
app.use(express.json({ limit: "100kb" }));

app.use(cors());
app.options("*", cors());

// ROUTES
app.use("/api/v1/nfts", nftRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/comment", commentRouter)

module.exports = app;