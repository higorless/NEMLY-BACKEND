import express from "express";
import { dbConnection } from "./database/mongoose/index.js";
import userRoutes from "./routes/user.routes.js";
import userLogin from "./routes/session.routes.js";
import messageSend from "./routes/message.routes.js";
import getMessages from "./routes/chat.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/login", userLogin);
app.use("/api/sendmessage", messageSend);
app.use("/api/getmessages", getMessages);

app.listen(port, () => {
  dbConnection();
  console.log(`Server running on port ${port}`);
});
