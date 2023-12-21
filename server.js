import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path, { dirname } from "path";

dotenv.config();

//databas config
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "./client/build")));

app.use(morgan("dev"));

//routes
app.use("/api/v1/auth/", authRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
