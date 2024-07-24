const express = require("express");
const cors = require("cors");
const app = express();

let hostname = "0.0.0.0"
let port = 3000;

app.use(cors());

app.get("/test", (req, res) => {
    res.send("Received!");
});

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});