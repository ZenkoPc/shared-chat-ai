import { PrismaClient } from "../generated/prisma/client.js";
import type { LoginRequest } from "../types/auth.js";
import { Logger } from "./logger.js";

const logger = Logger.getInstance();

declare global {
    var prismaInstance: PrismaClient | undefined
}

export class PrismaService {
    private static instance: PrismaService;
    private prismaInstance: PrismaClient;

    constructor(){
        this.prismaInstance = globalThis.prismaInstance || new PrismaClient()
        if(process.env.NODE_ENV !== "production") globalThis.prismaInstance = this.prismaInstance
    }

    public static getInstance(): PrismaService {
        if(!PrismaService.instance){
            PrismaService.instance = new PrismaService();
        }
        return PrismaService.instance
    }

    async verifyUserSignIn({
        username
    }: Omit<LoginRequest, "password">){
        try{
            const userExists = await this.prismaInstance.users.findFirst({
                where: {
                    username
                },
                select: {
                    password: true
                }
            })
            if(!userExists){
                logger.errorLog("User not found during sign-in attempt [404]")
                throw new Error("User not found", {
                    cause: 404
                })
            }
            return {
                error: null,
                data: userExists
            }
        }catch(err: any){
            return {
                data: null,
                error: {
                    message: err?.message || "Retrieval from DB failed - Users Login Schema",
                    code: err?.cause || 500
                }
            }
        }
    }

    async getUser({
        username,
        password
    }: LoginRequest){
        try{
            const userExists = await this.prismaInstance.users.findFirst({
                where: {
                    username,
                    password
                },
                omit: {
                    password: true
                }
            })
            if(!userExists){
                logger.errorLog("User not found during sign-in attempt [404]")
                throw new Error("User not found", {
                    cause: 404
                })
            }
            return {
                error: null,
                data: userExists
            }
        }catch(err: any){
            return {
                data: null,
                error: {
                    message: err?.message || "Retrieval from DB failed - Users Login Schema",
                    code: err?.cause || 500
                }
            }
        }
    }

}
