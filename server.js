const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV != "production";
const nextServer = next({dev});
const handle =  nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log("DB connection successful!"));

const port = 3000;
const version_p = "v1";

let server;
nextServer.prepare().then(() => {
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
        console.log(`App running on url api http://localhost:${port}/api/${version_p}/`);
        console.log(`App running on url http://localhost:${port}`);
    });
});

