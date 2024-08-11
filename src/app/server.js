import apiRouter from "./api/index.js";
import express from "express";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
app.use("/api", apiRouter);


app.listen(port, host, () => {
  console.log(`http://${host}:${port}`);
});
