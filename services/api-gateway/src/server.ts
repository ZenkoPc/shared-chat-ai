import express from 'express';
import { Logger } from './services/logger.js';

const app = express();

const logger = new Logger();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Api Gateway is running"
    })
})

app.listen(PORT, () => {
    logger.simpleLog(`API Gateway is running on port ${PORT}`);
})