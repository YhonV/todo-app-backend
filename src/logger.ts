import { ConsoleLogger } from '@nestjs/common';
import Winston, { format, transports, createLogger } from 'winston';

export class LoggerWinston extends ConsoleLogger{
    logger: Winston.Logger;

    constructor(){
        super();
        const transport = new transports.Console();
        this.logger = createLogger({
            level: 'info',
            format: format.combine(format.json()),
            transports: [transport],
        });
    }

    now(): string {
        const now = new Date();
        return now.toLocaleString();
    }

    log(message: any, ctx: string): void{

        if (typeof message === 'string') {
            this.logger.info({message, loggerName: ctx, timeMilis: this.now()});
        } else{
            this.logger.info({...message, loggerName: ctx, timeMilis: this.now()})
        }
    }

    debug(message: any, context?: string){
        if (typeof message === 'string'){
            this.logger.debug({message, loggerName: context, timeMilis: this.now()})
        } else{
            this.logger.debug({...message, loggerName: context, timeMilis: this.now()})
        }
    }

    error(message: any, trace?: string, ctx?: string): void{

        if (typeof message === 'string') {
            this.logger.error({message, loggerName: ctx, trace, timeMilis: this.now()});
        } else{
            this.logger.error({...message, loggerName: ctx, trace, timeMilis: this.now()});
        }
    }

    writeLog(level: string, body: any): void{
        this.logger.log(level, body);
    }

}