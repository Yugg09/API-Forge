import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import collectionRoutes from "./routes/collection.routes";
import requestRoutes from "./routes/request.routes";
import executeRoutes from "./routes/execute.routes";
import historyRoutes from "./routes/history.routes";


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
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/requests", executeRoutes);
app.use("/api/history", historyRoutes);

app.get("/health", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Forge Server is running 🚀",
  });
});



app.use((req,res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;