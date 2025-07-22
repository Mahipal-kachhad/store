import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

export default app;
