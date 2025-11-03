import Bcrypt from "bcryptjs"

export class BcryptService {
    private static instance: BcryptService;
    private bcrypt: typeof Bcrypt;

    constructor(){
        this.bcrypt = Bcrypt
    }

    public static getInstance(): BcryptService {
        if(!BcryptService.instance){
            BcryptService.instance = new BcryptService()
        }
        return BcryptService.instance
    }

    async hashPassword(password: string): Promise<string> {
        return this.bcrypt.hash(password, 10)
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await this.bcrypt.compare(password, hashPassword)
    }
}