import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// ✅ Corrected CORS Setup
app.use(
  cors({
    origin: process.env.Frontend_URL, // should be "http://localhost:5173"
    methods: ["POST"],
    credentials: true, // ✅ lowercase and required
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

// DB connection
dbConnection();

// Global error middleware
app.use(errorMiddleware);

export default app;
