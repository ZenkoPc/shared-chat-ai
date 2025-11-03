import { Router } from 'express'
import { Logger } from '../../../services/logger.js';
import { validateLogin } from './validation.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';
import { signIn } from './controller.js';

const logger = Logger.getInstance();
const errorHandler = ErrorHandler.getInstance();

logger.simpleLog("Auth Router initialized");

export const authRouter = Router()
    .post('/login', async (req, res) => {
        const {
            data,
            error
        } = await validateLogin(req, res);

        if(error){
            return errorHandler.handleValidationError({
                message: error.message,
                res
            })
        }

        const { error: controllerError, data: tokens } = await signIn({
            password: data.password,
            username: data.username
        })

        if(controllerError){
            switch(controllerError.code){
                case 401:
                    return errorHandler.handleUnauthorizedError({
                        message: controllerError.message,
                        res
                    })
                case 404:
                    return errorHandler.handleNotFoundError({
                        message: controllerError.message,
                        res
                    })
                case 500:
                    return errorHandler.handleInternalServerError({
                        message: controllerError.message,
                        res
                    })
                default:
                    return errorHandler.handleInternalServerError({
                        message: "An unexpected error occurred during sign-in.",
                        res
                    })
            }
        }

        return res.status(200).send({ tokens })
    })
    .post('/verify', (req, res) => {
        return res.status(401).send({ message: "Not Implemented" })
    })
    .post('/refresh', (req, res) => {
        return res.status(401).send({ message: "Not Implemented" })
    })