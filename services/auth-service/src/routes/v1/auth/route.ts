import { Router } from 'express'
import { Logger } from '../../../services/logger.js';
import { validateLogin } from './validation.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';

const logger = Logger.getInstance();
const errorHandler = ErrorHandler.getInstance();

logger.simpleLog("Auth Router initialized");

export const authRouter = Router()
    .post('/login', async (req, res) => {
        const {
            error
        } = await validateLogin(req, res);

        if(error){
            return errorHandler.handleValidationError({
                message: error.message,
                res
            })
        }

        return errorHandler.handleInternalServerError({
            message: "An unexpected error occurred during sign-in.",
            res
        })
    })
    .post('/verify', (req, res) => {
        return res.status(401).send({ message: "Not Implemented" })
    })
    .post('/refresh', (req, res) => {
        return res.status(401).send({ message: "Not Implemented" })
    })