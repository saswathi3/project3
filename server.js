const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const books = require("./routes/api/books")
const path = require('path');
require("dotenv").config( { path: "./config.env" } )

connectDB()

const app = express()

// Calling CORS

// Init Middleware
app.use(express.json())
app.use(cors())
app.use("/api/books", books)

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));




