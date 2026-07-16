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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ProgressBar, OfflineScreen, ErrorScreen } from './components';
import { useNetworkStatus, useBackButton } from './hooks';
import { logger } from './utils/logger';
import './styles/App.css';
export function App() {
    var _this = this;
    var _a = useState('loading'), appState = _a[0], setAppState = _a[1];
    var _b = useState(0), progress = _b[0], setProgress = _b[1];
    var _c = useState(''), errorCode = _c[0], setErrorCode = _c[1];
    var _d = useState(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var networkStatus = useNetworkStatus();
    var webviewRef = useRef(null);
    useEffect(function () {
        var initApp = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, StatusBar.setStyle({ style: Style.Light })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, StatusBar.setBackgroundColor({ color: '#ffffff' })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, SplashScreen.hide()];
                    case 3:
                        _a.sent();
                        logger.info('App initialized successfully');
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        logger.error('Error initializing app', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        initApp();
    }, []);
    useEffect(function () {
        if (networkStatus.connected) {
            if (appState === 'offline') {
                logger.info('Network restored, retrying');
                setAppState('loading');
            }
            else {
                setAppState('online');
            }
        }
        else {
            setAppState('offline');
        }
    }, [networkStatus.connected, appState]);
    var handleWebViewMessage = function (event) {
        var customEvent = event;
        var _a = customEvent.detail || {}, type = _a.type, data = _a.data;
        switch (type) {
            case 'progress':
                setProgress((data === null || data === void 0 ? void 0 : data.progress) || 0);
                break;
            case 'loaded':
                setProgress(100);
                setTimeout(function () { return setProgress(0); }, 500);
                setAppState('online');
                break;
            case 'error':
                setErrorCode((data === null || data === void 0 ? void 0 : data.code) || 'Error');
                setErrorMessage((data === null || data === void 0 ? void 0 : data.message) || 'Failed to load page');
                setAppState('error');
                break;
            default:
                break;
        }
    };
    var handleRetry = function () {
        if (webviewRef.current && appState === 'offline') {
            setAppState('loading');
        }
        else if (webviewRef.current && appState === 'error') {
            setAppState('loading');
            window.location.reload();
        }
    };
    useBackButton(function () {
        var _a, _b;
        var webView = webviewRef.current;
        if (webView && ((_b = (_a = webView).canGoBack) === null || _b === void 0 ? void 0 : _b.call(_a))) {
            webView.goBack();
            return true;
        }
        return false;
    });
    useEffect(function () {
        window.addEventListener('message', handleWebViewMessage);
        return function () {
            window.removeEventListener('message', handleWebViewMessage);
        };
    }, [appState]);
    return (_jsxs("div", { className: "app", children: [_jsx(ProgressBar, { progress: progress, visible: appState === 'loading' }), appState === 'offline' && (_jsx(OfflineScreen, { onRetry: handleRetry })), appState === 'error' && (_jsx(ErrorScreen, { errorCode: errorCode, errorMessage: errorMessage, onRetry: handleRetry })), (appState === 'online' || appState === 'loading') && (_jsx("div", { ref: webviewRef, className: "webview-container", style: {
                    display: appState === 'loading'
                        ? 'none'
                        : 'block',
                } }))] }));
}
