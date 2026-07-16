import { config } from '../config/config';
var Logger = /** @class */ (function () {
    function Logger() {
        this.isDevelopment = config.environment === 'development';
    }
    Logger.prototype.log = function (level, message, data) {
        var timestamp = new Date().toISOString();
        var prefix = "[".concat(timestamp, "] [").concat(level.toUpperCase(), "]");
        switch (level) {
            case 'debug':
                if (this.isDevelopment) {
                    console.debug("".concat(prefix, " ").concat(message), data);
                }
                break;
            case 'info':
                console.info("".concat(prefix, " ").concat(message), data);
                break;
            case 'warn':
                console.warn("".concat(prefix, " ").concat(message), data);
                break;
            case 'error':
                console.error("".concat(prefix, " ").concat(message), data);
                break;
        }
    };
    Logger.prototype.debug = function (message, data) {
        this.log('debug', message, data);
    };
    Logger.prototype.info = function (message, data) {
        this.log('info', message, data);
    };
    Logger.prototype.warn = function (message, data) {
        this.log('warn', message, data);
    };
    Logger.prototype.error = function (message, data) {
        this.log('error', message, data);
    };
    return Logger;
}());
export var logger = new Logger();
