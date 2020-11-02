"use strict";
const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600000,
            httpOnly: true
        }
    })
);

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'from43-79',
    api_key: '642533571783345',
    api_secret: '6Vka4_OJOrh1aOaZUgXs4kGhAe8'
});

// routes
require("./routes/index.js")(app);

// stuff
// Serve the build
app.use(express.static(__dirname + "/from43-79/build"));
// cors stuff
const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5000"] }));
app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/from43-79/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});