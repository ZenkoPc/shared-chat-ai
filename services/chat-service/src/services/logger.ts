import pino from "pino"

export class Logger {

    private logger

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