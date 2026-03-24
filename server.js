const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "application/pdf") {
            cb(null, "uploads/pdfs");
        } else {
            cb(null, "uploads/videos");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully!" });
});

// Get files
const fs = require("fs");

app.get("/files", (req, res) => {
    const pdfs = fs.readdirSync("uploads/pdfs");
    const videos = fs.readdirSync("uploads/videos");

    res.json({ pdfs, videos });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
