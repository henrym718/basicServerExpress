import http from "http";
import { app } from "./server";

const server = http.createServer(app);
server
  .listen(3000)
  .on("listening", () => console.log("Server running on port 3000"))
  .on("error", (err) => console.log(err));
