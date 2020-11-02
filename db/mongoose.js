/* This module will hold our connection to
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose');

/* Connect to our database */
// Get the URI of the local database, or the one specified on deployment.
// 4379API is the name of the database that we are using
// 'mongodb://localhost:27017/4379API'
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://from4379:yingyingying@cluster0-uj79h.mongodb.net/4379API?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on("error", function() {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
});

mongoose.connection.once("open", function() {
    console.log("Successfully connected to the database");
});

module.exports = { mongoose }; // Export the active connection.