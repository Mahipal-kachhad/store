import { config } from "dotenv";
import app from "./app";
import connectDB from "./config/db";

config();
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
