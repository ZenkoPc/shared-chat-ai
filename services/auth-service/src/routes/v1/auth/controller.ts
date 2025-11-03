import { BcryptService } from "../../../services/bcrypt.js";
import { JWTTokens } from "../../../services/jwt.js";
import { PrismaService } from "../../../services/prisma.js";
import type { LoginRequest } from "../../../types/auth.js";

const prismaService = PrismaService.getInstance();
const bcryptService = BcryptService.getInstance();
const jwt = JWTTokens.getInstance();

export async function signIn({
    username,
    password
}: LoginRequest){
    
    try{
        const res = await prismaService.verifyUserSignIn({
            username
        })

        if(res.error){
            throw new Error(res.error.message, {
                cause: res.error.code
            })
        }

        const testPassword = await bcryptService.comparePassword(password, res.data.password)

        if(!testPassword){
            throw new Error("Invalid credentials [401]", {
                cause: 401
            })
        }

        const userData = await prismaService.getUser({
            username,
            password
        })

        if(userData.error){
            throw new Error(userData.error.message, {
                cause: userData.error.code
            })
        }

        const { accessToken, refreshToken } = jwt.sign(userData.data)

        return {
            data: {
                accessToken,
                refreshToken
            },
            error: null
        }
    }catch(err: any){
        return {
            error: {
                message: err?.message || "Sign-In Failed",
                code: err?.cause || 500
            },
            token: null
        }
    }

}