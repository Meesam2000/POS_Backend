const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());


app.use(
    session({
        key: "userId",
        secret: "login",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 2,
        },
    })
);

app.use("/", require("./routes"));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('running server ' + 'http://localhost:${PORT}');
});