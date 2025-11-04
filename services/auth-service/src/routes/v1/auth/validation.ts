import { loginSchema, type LoginRequest } from '../../../types/auth.js';
import { type Request, type Response } from 'express';

export async function validateLogin(req: Request, res: Response){

    const body: LoginRequest = req.body as unknown as LoginRequest

    const { success, data, error } = loginSchema.safeParse({
        username: body?.username,
        password: body?.password
    })

    if(!success && error){
        const errors = error.errors.map((err) => err.message).join(', ')
        return {
            data: null,
            error: {
                message: errors
            }
        }
    }

    return {
        data,
        error: null
    }

}