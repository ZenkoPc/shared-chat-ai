import pino from "pino"

export class Logger {

    private static instance: Logger
    private readonly logger

    constructor(){
        this.logger = pino({
            level: "info",
            transport:  {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'HH:MM:ss',
                    ignore: 'pid,hostname'
                }
            }
        })
    }

    public static getInstance(): Logger {
        if(!Logger.instance){
            Logger.instance = new Logger()
        }
        return Logger.instance
    }

    simpleLog(message: string){
        this.logger.info(message)
    }

    errorLog(message: string){
        this.logger.error(message)
    }

    debugLog(message: string){
        this.logger.debug(message)
    }

    warnLog(message: string){
        this.logger.warn(message)
    }

    fatalLog(message: string){
        this.logger.fatal(message)
    }

    traceLog(message: string){
        this.logger.trace(message)
    } 

}