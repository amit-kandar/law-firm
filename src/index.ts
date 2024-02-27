import dotenv from "dotenv";
import { connectToDB } from "./database";
import { app } from "./app";
import logger from "./config/logger";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000;

connectToDB()
    .then(() => {
        app.on("error", err => {
            logger.error("Error: ", err);
        })

        app.listen(PORT, () => {
            logger.info(`server is running at port ${PORT}`);
        })
    })
    .catch(err => logger.error("MongoDB connection failed!!", err))