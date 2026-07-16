var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Network } from '@capacitor/network';
import { logger } from '../utils/logger';
var NetworkService = /** @class */ (function () {
    function NetworkService() {
        this.listeners = new Set();
        this.currentStatus = {
            connected: true,
            connectionType: 'unknown',
        };
        this.initialized = false;
    }
    NetworkService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Network.getStatus()];
                    case 2:
                        status_1 = _a.sent();
                        this.currentStatus = {
                            connected: status_1.connected,
                            connectionType: status_1.connectionType || 'unknown',
                        };
                        Network.addListener('networkStatusChange', function (status) {
                            _this.currentStatus = {
                                connected: status.connected,
                                connectionType: status.connectionType || 'unknown',
                            };
                            _this.notifyListeners();
                            logger.info('Network status changed', _this.currentStatus);
                        });
                        this.initialized = true;
                        logger.info('NetworkService initialized', this.currentStatus);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        logger.error('Failed to initialize NetworkService', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NetworkService.prototype.addListener = function (listener) {
        var _this = this;
        this.listeners.add(listener);
        listener(this.currentStatus);
        return function () {
            _this.listeners.delete(listener);
        };
    };
    NetworkService.prototype.notifyListeners = function () {
        var _this = this;
        this.listeners.forEach(function (listener) {
            try {
                listener(_this.currentStatus);
            }
            catch (error) {
                logger.error('Error in network listener', error);
            }
        });
    };
    NetworkService.prototype.getStatus = function () {
        return __assign({}, this.currentStatus);
    };
    NetworkService.prototype.isConnected = function () {
        return this.currentStatus.connected;
    };
    return NetworkService;
}());
export var networkService = new NetworkService();
