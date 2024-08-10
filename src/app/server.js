import apiRouter from "./api/index.js";
import express from "express";

const app = express();

let host;
let port = 3000;
if (process.env.NODE_ENV === "production") {
  host = "0.0.0.0";
} else {
  host = "localhost";
}

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, host, () => {
  console.log(`http://${host}:${port}`);
});
