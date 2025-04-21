import { LoggerService, LogLevel } from "@nestjs/common";
import { WinstonLogger } from "./winston.logger";

export class AppLogger implements LoggerService {
    log(message: any, ...optionalParams: any[]) {
        WinstonLogger.info(message, { extra: optionalParams})
    }
    error(message: any, ...optionalParams: any[]) {
        WinstonLogger.error(message, { extra: optionalParams})
    }
    warn(message: any, ...optionalParams: any[]) {
        WinstonLogger.warn(message, { extra: optionalParams})
    }
    debug?(message: any, ...optionalParams: any[]) {
        WinstonLogger.debug(message, { extra: optionalParams})
    }
    verbose?(message: any, ...optionalParams: any[]) {
        WinstonLogger.verbose(message, { extra: optionalParams})
    }
    fatal?(message: any, ...optionalParams: any[]) {
        WinstonLogger.log('fatal', message, { extra: optionalParams})
    }
    setLogLevels?(levels: LogLevel[]) {
        const highest = levels[0] // Nest order by priority, first = most verbose
        WinstonLogger.level = highest
    }
}