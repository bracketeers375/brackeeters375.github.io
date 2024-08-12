import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./api/index.js";
import viewRouter from "./views/index.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api", apiRouter);
app.use("/", viewRouter);

const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
