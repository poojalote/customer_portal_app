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
import { useEffect, useRef } from 'react';
import { App } from '@capacitor/app';
import { logger } from '../utils/logger';
import { DOUBLE_BACK_EXIT_DELAY } from '../utils/constants';
export function useBackButton(onBack) {
    var _this = this;
    var backPressedRef = useRef(false);
    var backTimeoutRef = useRef(null);
    useEffect(function () {
        var handleBackButton = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (onBack === null || onBack === void 0 ? void 0 : onBack()) {
                            return [2 /*return*/];
                        }
                        if (!backPressedRef.current) return [3 /*break*/, 2];
                        return [4 /*yield*/, App.exitApp()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        backPressedRef.current = true;
                        logger.debug('Press back again to exit');
                        if (backTimeoutRef.current) {
                            clearTimeout(backTimeoutRef.current);
                        }
                        backTimeoutRef.current = setTimeout(function () {
                            backPressedRef.current = false;
                            logger.debug('Back press timeout reset');
                        }, DOUBLE_BACK_EXIT_DELAY);
                        return [2 /*return*/];
                }
            });
        }); };
        var setupListener = function () { return __awaiter(_this, void 0, void 0, function () {
            var listener;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, App.addListener('backButton', handleBackButton)];
                    case 1:
                        listener = _a.sent();
                        return [2 /*return*/, function () {
                                void listener.remove();
                                if (backTimeoutRef.current) {
                                    clearTimeout(backTimeoutRef.current);
                                }
                            }];
                }
            });
        }); };
        var cleanup;
        setupListener().then(function (cleanup_fn) {
            cleanup = cleanup_fn;
        });
        return function () {
            cleanup === null || cleanup === void 0 ? void 0 : cleanup();
        };
    }, [onBack]);
}
