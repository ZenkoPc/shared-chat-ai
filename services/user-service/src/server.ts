import express from 'express';
import { Logger } from './services/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const logger = new Logger();

const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "User Service is running"
    })
})

app.listen(PORT, () => {
    logger.simpleLog(`User service is running on port ${PORT}`);
})