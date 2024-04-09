import express from "express";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// app.get("/", (req, res) => {
//   res.send("Nice working");
// });

// Error Middleware
app.use(errorMiddleware);