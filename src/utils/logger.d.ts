type LogLevel = 'debug' | 'info' | 'warn' | 'error';
declare class Logger {
    private isDevelopment;
    log(level: LogLevel, message: string, data?: unknown): void;
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
}
export declare const logger: Logger;
export {};
