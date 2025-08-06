import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, 
      "https://zestora.vercel.app", 
      "https://zestora-git-main-anujyadav911.vercel.app",
      "https://zestoraweb-z8wn.vercel.app",
      "https://zestoraweb.vercel.app",
      "https://zestoraweb-rvxf.vercel.app"
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Zestora API" });
});
dbConnection();

app.use(errorMiddleware);

export default app;
