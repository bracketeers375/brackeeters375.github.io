import express from "express";
import routes from "./routes";
const app = express();
let hostname = "0.0.0.0";
let port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api", routes);

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
