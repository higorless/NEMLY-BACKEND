import express from "express";
import { dbConnection } from "./database/mongoose/index.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/login", authRoutes);

app.listen(port, () => {
  dbConnection();
  console.log(`Server running on port ${port}`);
});
