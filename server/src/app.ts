import express from "express";
import cors from "cors";
import authRouter from "./routes/userRouter";
import userRouter from "./routes/adminRouter";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
import cartRouter from "./routes/cartRouter";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);

export default app;
