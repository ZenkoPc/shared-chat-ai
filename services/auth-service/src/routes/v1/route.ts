import { Router } from 'express';
import { authRouter } from './auth/route.js';
import { Logger } from '../../services/logger.js';

const logger = Logger.getInstance();

logger.simpleLog("v1 Router initialized");

export const v1Router = Router()
    .use('/auth', authRouter)