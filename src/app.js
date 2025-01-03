import { dbConnection } from "./database/mongoose/index.js";
import { app, server } from "./socket/socket.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import userLogin from "./routes/session.routes.js";
import messageSend from "./routes/message.routes.js";
import getMessages from "./routes/chat.routes.js";
import cors from "cors";
import dotenv from "dotenv";

const port = process.env.SERVER_PORT || 3000;

dotenv.config();

app.use(
  cors({
    origin: "*", // process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/login", userLogin);
app.use("/api/sendmessage", messageSend);
app.use("/api/getmessages", getMessages);

server.listen(port, () => {
  dbConnection();
  console.log(`Server running on port ${port}`);
});
