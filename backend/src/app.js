import express from "express";
import morgan from "morgan";
import authRoutes from "./routers/auth.routes.js";
import cookieParser from "cookie-parser";
import tasksRoutes from "./routers/tasks.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*", // Permite todos los orígenes
    credentials: false, // No permite credenciales
  })
);
app.use(morgan("dev"));
app.use(express.json()); // For express can read json
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
