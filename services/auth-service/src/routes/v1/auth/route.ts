import { Router } from 'express'
import { Logger } from '../../../services/logger.js';

const logger = Logger.getInstance();

logger.simpleLog("Auth Router initialized");

export const authRouter = Router()
    .post('/login', (req, res) => {
        res.status(401).send({ message: "Not Implemented" })
    })
    .post('/verify', (req, res) => {
        res.status(401).send({ message: "Not Implemented" })
    })
    .post('/refresh', (req, res) => {
        res.status(401).send({ message: "Not Implemented" })
    })