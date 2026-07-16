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
import { logger } from '../utils/logger';
import { PERMISSION_REQUEST_TIMEOUT } from '../utils/constants';
var PermissionService = /** @class */ (function () {
    function PermissionService() {
        this.requestedPermissions = new Set();
    }
    PermissionService.prototype.requestPermission = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var timeout = setTimeout(function () {
                            logger.warn("Permission request timeout for ".concat(type));
                            resolve(false);
                        }, PERMISSION_REQUEST_TIMEOUT);
                        _this.performRequest(type)
                            .then(function (granted) {
                            clearTimeout(timeout);
                            resolve(granted);
                        })
                            .catch(function (error) {
                            clearTimeout(timeout);
                            logger.error("Permission request error for ".concat(type), error);
                            resolve(false);
                        });
                    })];
            });
        });
    };
    PermissionService.prototype.performRequest = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        this.requestedPermissions.add(type);
                        _a = type;
                        switch (_a) {
                            case 'camera': return [3 /*break*/, 1];
                            case 'location': return [3 /*break*/, 3];
                            case 'storage': return [3 /*break*/, 5];
                            case 'microphone': return [3 /*break*/, 7];
                            case 'notifications': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.requestCameraPermission()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.requestLocationPermission()];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.requestStoragePermission()];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.requestMicrophonePermission()];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: return [4 /*yield*/, this.requestNotificationPermission()];
                    case 10: return [2 /*return*/, _b.sent()];
                    case 11: return [2 /*return*/, false];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        error_1 = _b.sent();
                        logger.error("Error requesting ".concat(type, " permission"), error_1);
                        return [2 /*return*/, false];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    PermissionService.prototype.requestCameraPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('Requesting camera permission');
                return [2 /*return*/, true];
            });
        });
    };
    PermissionService.prototype.requestLocationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('Requesting location permission');
                return [2 /*return*/, true];
            });
        });
    };
    PermissionService.prototype.requestStoragePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('Requesting storage permission');
                return [2 /*return*/, true];
            });
        });
    };
    PermissionService.prototype.requestMicrophonePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('Requesting microphone permission');
                return [2 /*return*/, true];
            });
        });
    };
    PermissionService.prototype.requestNotificationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('Requesting notification permission');
                return [2 /*return*/, true];
            });
        });
    };
    PermissionService.prototype.hasRequestedPermission = function (type) {
        return this.requestedPermissions.has(type);
    };
    return PermissionService;
}());
export var permissionService = new PermissionService();
