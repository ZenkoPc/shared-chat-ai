import { type Response } from "express";
import { Logger } from "../services/logger.js";

interface ValidationError {
    message: string,
    res: Response
}

const logger = Logger.getInstance();

export class ErrorHandler {
    private static instance: ErrorHandler

    public static getInstance(): ErrorHandler {
        if (!this.instance) {
            this.instance = new ErrorHandler()
        }
        return this.instance
    }

    handle(handle: {
        res: Response,
        statusCode: number,
        message: string,
        type: string
    }){
        const {
            res,
            statusCode,
            message,
            type
        } = handle

        return res.status(statusCode).json({
            type,
            message
        })
    }

    handleValidationError({ message, res }: ValidationError){
        logger.errorLog("Validation Error: " + message + " [400]")
        return this.handle({
            res,
            statusCode: 400,
            message,
            type: "Validation Error"
        })
    }

    handleUnauthorizedError({ message, res }: { message: string, res: Response }){
        logger.errorLog("Unauthorized Error: " + message + " [401]")
        return this.handle({
            res,
            statusCode: 401,
            message,
            type: "Unauthorized Error"
        })
    }

    handleNotFoundError({ message, res }: { message: string, res: Response }){
        logger.errorLog("Not Found Error: " + message + " [404]")
        return this.handle({
            res,
            statusCode: 404,
            message,
            type: "Not Found Error"
        })
    }

    handleInternalServerError({ message, res }: { message: string, res: Response }){
        logger.errorLog("Internal Server Error: " + message + " [500]")
        return this.handle({
            res,
            statusCode: 500,
            message,
            type: "Internal Server Error"
        })
    }
}