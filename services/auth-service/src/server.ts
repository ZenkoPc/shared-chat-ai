import express from 'express';
import dotenv from 'dotenv';
import { Logger } from './services/logger.js';
import { v1Router } from './routes/v1/route.js';

dotenv.config();

const app = express();

app.disable('x-powered-by');

const logger = Logger.getInstance();

const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use('/api/v1', v1Router)

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Auth Service is running"
    })
})

app.listen(PORT, () => {
    logger.simpleLog(`Auth Service is running on port ${PORT}`);
})