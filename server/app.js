const path = require("path");
const express = require("express");
const app = express();

const clientPath = path.join(__dirname, '../', 'client');

app.use(express.static(path.join(clientPath, 'build')));
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log(path.join(clientPath, 'build'))
    res.sendFile(path.join(clientPath, 'build', "index.html"));
});

// start express server on port 5000
app.listen(80, () => {
    console.log("server started on port 3000");
});