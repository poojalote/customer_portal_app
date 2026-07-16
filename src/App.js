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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { OfflineScreen, PermissionScreen, } from './components';
import { useNetworkStatus } from './hooks';
import { permissionService } from './services/PermissionService';
import { logger } from './utils/logger';
import { config } from './config/config';
import './styles/App.css';
var PERMISSION_LABELS = {
    camera: 'Camera — for photo uploads',
    location: 'Location — for location-based features',
    storage: 'Storage — for downloading files',
    notifications: 'Notifications — for updates and alerts',
    microphone: 'Microphone — for audio uploads',
};
function getRequiredPermissions() {
    var required = [];
    if (config.permissions.camera)
        required.push('camera');
    if (config.permissions.location)
        required.push('location');
    if (config.permissions.storage)
        required.push('storage');
    if (config.permissions.notification)
        required.push('notifications');
    if (config.permissions.microphone)
        required.push('microphone');
    return required;
}
export function App() {
    var _this = this;
    var _a = useState('loading'), appState = _a[0], setAppState = _a[1];
    var _b = useState([]), permissionItems = _b[0], setPermissionItems = _b[1];
    var _c = useState(false), requesting = _c[0], setRequesting = _c[1];
    var networkStatus = useNetworkStatus();
    useEffect(function () {
        var initApp = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, StatusBar.setStyle({ style: Style.Light })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, StatusBar.setBackgroundColor({ color: '#ffffff' })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_1 = _a.sent();
                        logger.error('Error initializing status bar', error_1);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, SplashScreen.hide()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        initApp();
    }, []);
    useEffect(function () {
        if (appState !== 'loading')
            return;
        if (!networkStatus.connected) {
            setAppState('offline');
            return;
        }
        var checkPermissions = function () { return __awaiter(_this, void 0, void 0, function () {
            var required, results, _i, required_1, type, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        required = getRequiredPermissions();
                        results = [];
                        _i = 0, required_1 = required;
                        _d.label = 1;
                    case 1:
                        if (!(_i < required_1.length)) return [3 /*break*/, 4];
                        type = required_1[_i];
                        _b = (_a = results).push;
                        _c = {
                            type: type,
                            label: PERMISSION_LABELS[type]
                        };
                        return [4 /*yield*/, permissionService.checkPermission(type)];
                    case 2:
                        _b.apply(_a, [(_c.granted = _d.sent(),
                                _c)]);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        setPermissionItems(results);
                        if (results.every(function (item) { return item.granted; })) {
                            setAppState('launching');
                        }
                        else {
                            setAppState('permissions');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        checkPermissions();
    }, [appState, networkStatus.connected]);
    useEffect(function () {
        if (appState === 'launching') {
            window.location.href = config.websiteUrl;
        }
    }, [appState]);
    useEffect(function () {
        if (!networkStatus.connected && appState !== 'offline' && appState !== 'launching') {
            setAppState('offline');
        }
    }, [networkStatus.connected, appState]);
    var handleRequestPermissions = function () { return __awaiter(_this, void 0, void 0, function () {
        var required, results, _i, required_2, type, alreadyGranted, granted, _a, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setRequesting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 8, 9]);
                    required = getRequiredPermissions();
                    results = [];
                    _i = 0, required_2 = required;
                    _b.label = 2;
                case 2:
                    if (!(_i < required_2.length)) return [3 /*break*/, 7];
                    type = required_2[_i];
                    return [4 /*yield*/, permissionService.checkPermission(type)];
                case 3:
                    alreadyGranted = _b.sent();
                    _a = alreadyGranted;
                    if (_a) return [3 /*break*/, 5];
                    return [4 /*yield*/, permissionService.requestPermission(type)];
                case 4:
                    _a = (_b.sent());
                    _b.label = 5;
                case 5:
                    granted = _a;
                    item = { type: type, label: PERMISSION_LABELS[type], granted: granted };
                    results.push(item);
                    setPermissionItems(__spreadArray([], results, true));
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    if (results.every(function (item) { return item.granted; })) {
                        setAppState('launching');
                    }
                    return [3 /*break*/, 9];
                case 8:
                    setRequesting(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleOfflineRetry = function () {
        setAppState('loading');
    };
    if (appState === 'offline') {
        return _jsx(OfflineScreen, { onRetry: handleOfflineRetry });
    }
    if (appState === 'permissions') {
        return (_jsx(PermissionScreen, { permissions: permissionItems, requesting: requesting, allGranted: permissionItems.every(function (item) { return item.granted; }), onRequest: handleRequestPermissions }));
    }
    return _jsx("div", { className: "app" });
}
