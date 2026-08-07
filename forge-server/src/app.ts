import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Forge Server is running 🚀",
  });
});

app.use("/api/auth", authRoutes);

app.use((req,res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;