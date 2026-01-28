import "./config/loadEnv.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import authRouter from "./routes/authRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

const app = express();


app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://zestora.vercel.app",
      "https://zestora-git-main-anujyadav911.vercel.app",
      "https://zestoraweb-z8wn.vercel.app",
      "https://zestoraweb.vercel.app",
      "https://zestoraweb-rvxf.vercel.app",
      "https://zestoraweb-1.vercel.app",
      "https://zestoraweb-2.onrender.com"
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "some_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // important for cross-domain auth
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Zestora API" });
});

if (process.env.NODE_ENV !== "test") {
  dbConnection();
}

app.use(errorMiddleware);

export default app;

