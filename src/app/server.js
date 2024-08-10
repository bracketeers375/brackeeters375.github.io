import express from "express";
import * as routes from "./routes/";
const app = express();
let hostname = "0.0.0.0";
let port = 3000;

app.use(express.static("public"));
app.use(express.json());

//THIS COMMENTED LINE NEEDS TO BE CONVERTED TO ESM
//app.use("/api", require("./routes"));
app.use("/api", routes);


app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
