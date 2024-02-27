import express, { Application } from "express";
import cors from "cors";
import { DATA_LIMIT } from "./constants";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import helmet from "helmet";

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(helmet());

// Import all routes
import userRouter from './routes/user.route';

// Declare routes
app.use('/api/v1/users', userRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})


export { app }