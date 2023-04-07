import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";
dotenv.config({ path: path.resolve(__dirname, "./.env") });
import cors from "cors";

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);


app.use(notFound);
app.use(errorHandler); 

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});