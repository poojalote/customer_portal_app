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
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem } from '@capacitor/filesystem';
import { PushNotifications } from '@capacitor/push-notifications';
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
            return __generator(this, function (_a) {
                this.requestedPermissions.add(type);
                switch (type) {
                    case 'camera':
                        return [2 /*return*/, this.requestCameraPermission()];
                    case 'location':
                        return [2 /*return*/, this.requestLocationPermission()];
                    case 'storage':
                        return [2 /*return*/, this.requestStoragePermission()];
                    case 'microphone':
                        return [2 /*return*/, this.requestMicrophonePermission()];
                    case 'notifications':
                        return [2 /*return*/, this.requestNotificationPermission()];
                    default:
                        return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    PermissionService.prototype.requestCameraPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.requestPermissions({ permissions: ['camera'] })];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.camera === 'granted' || status.camera === 'limited'];
                }
            });
        });
    };
    PermissionService.prototype.requestLocationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Geolocation.requestPermissions()];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.location === 'granted' || status.coarseLocation === 'granted'];
                }
            });
        });
    };
    PermissionService.prototype.requestStoragePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Filesystem.requestPermissions()];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.publicStorage === 'granted'];
                }
            });
        });
    };
    PermissionService.prototype.requestMicrophonePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.requestPermissions({ permissions: ['photos'] })];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.photos === 'granted' || status.photos === 'limited'];
                }
            });
        });
    };
    PermissionService.prototype.requestNotificationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PushNotifications.requestPermissions()];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status.receive === 'granted'];
                }
            });
        });
    };
    PermissionService.prototype.checkPermission = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status_1, status_2, status_3, status_4, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        _a = type;
                        switch (_a) {
                            case 'camera': return [3 /*break*/, 1];
                            case 'location': return [3 /*break*/, 3];
                            case 'storage': return [3 /*break*/, 5];
                            case 'notifications': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, Camera.checkPermissions()];
                    case 2:
                        status_1 = _b.sent();
                        return [2 /*return*/, status_1.camera === 'granted' || status_1.camera === 'limited'];
                    case 3: return [4 /*yield*/, Geolocation.checkPermissions()];
                    case 4:
                        status_2 = _b.sent();
                        return [2 /*return*/, status_2.location === 'granted' || status_2.coarseLocation === 'granted'];
                    case 5: return [4 /*yield*/, Filesystem.checkPermissions()];
                    case 6:
                        status_3 = _b.sent();
                        return [2 /*return*/, status_3.publicStorage === 'granted'];
                    case 7: return [4 /*yield*/, PushNotifications.checkPermissions()];
                    case 8:
                        status_4 = _b.sent();
                        return [2 /*return*/, status_4.receive === 'granted'];
                    case 9: return [2 /*return*/, false];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        logger.error("Error checking ".concat(type, " permission"), error_1);
                        return [2 /*return*/, false];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PermissionService.prototype.hasRequestedPermission = function (type) {
        return this.requestedPermissions.has(type);
    };
    return PermissionService;
}());
export var permissionService = new PermissionService();
