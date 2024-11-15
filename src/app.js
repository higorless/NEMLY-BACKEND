import express from "express";
import { dbConnection } from "./database/mongoose/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import userRoutes from "./routes/user.routes.js";
import userLogin from "./routes/session.routes.js";
import messageSend from "./routes/message.routes.js";
import getMessages from "./routes/chat.routes.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/login", userLogin);
app.use("/api/sendmessage", messageSend);
app.use("/api/getmessages", getMessages);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  dbConnection();
  console.log(`Server running on port ${port}`);
});
