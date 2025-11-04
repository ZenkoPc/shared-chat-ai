import * as z from 'zod'

export interface LoginRequest {
    username: string,
    password: string
}

export const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).min(3, {
        message: "Username must be at least 3 characters long"
    }).max(100, {
        message: "Username must be at most 100 characters long"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters long"
    }).max(100, {
        message: "Password must be at most 100 characters long"
    })
})