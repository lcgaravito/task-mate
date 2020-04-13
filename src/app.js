/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// settings
// eslint-disable-next-line no-undef
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));

// Serve any static files
app.use(express.static(path.join(__dirname, "../client/build")));
// Handle React routing, return all requests to React app
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = app;