import express from 'express';
import { Logger } from './services/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

const logger = new Logger()

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Chat Service is running"
    })
})

app.listen(PORT, () => {
    logger.simpleLog(`Chat service is running on port ${PORT}`);
})