import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
// import helmet from "helmet";

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use(express.static("public"));

// app.use(helmet());

// Import all routes
import contactRoute from './routes/contact.route';
import serviceRoute from './routes/service.route';

// Declare routes
app.use('/api/v1/contacts', contactRoute);
app.use('/api/v1/services', serviceRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})


export { app }