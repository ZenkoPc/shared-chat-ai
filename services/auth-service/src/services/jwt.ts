import jsonwebtoken from 'jsonwebtoken'

export class JWTTokens {

    private readonly JWT
    private readonly secret
    private static instance: JWTTokens

    constructor(){
        this.JWT = jsonwebtoken
        this.secret = process.env.JWT_SECRET
    }

    public static getInstance(): JWTTokens {
        if (!JWTTokens.instance) {
            JWTTokens.instance = new JWTTokens()
        }
        return JWTTokens.instance
    }

    sign(payload: object){
        if(!this.secret) {
            throw new Error('JWT_SECRET is not defined in environment variables')
        }

        return {
            accessToken: this.JWT.sign(payload, this.secret, {
                expiresIn: process.env.JWT_EXPIRES_IN as any || '1h',
                encoding: 'utf-8'
            }),
            refreshToken: this.JWT.sign(payload, this.secret, {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any || '7d',
                encoding: 'utf-8'
            })
        }
    }

    verify(token: string){
        return this.JWT.verify(token, this.secret as string, {
            algorithms: ['HS256']
        })
    }

    refresh(token: string){
        const isValid = this.verify(token)

        if(isValid){
            return this.sign({
               ...isValid as jsonwebtoken.JwtPayload
            })
        }

        return null
    }

}