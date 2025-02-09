import express from "express";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";
import noteRoutes from "./route/note.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection (avval bazani ulaymiz)
connectDB();

// Middlewares
app.use(express.json()); // JSONni parse qilish
app.use(cookieParser()); // Cookie parse qilish

// CORS dinamik qilib olinishi
const allowedOrigins = "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigins.split(","), // Agar ORIGIN ko‘p bo‘lsa, arrayga aylantiramiz
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
