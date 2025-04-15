import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
