import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../styles/ErrorScreen.css';
export function ErrorScreen(_a) {
    var _b = _a.errorCode, errorCode = _b === void 0 ? 'Error' : _b, _c = _a.errorMessage, errorMessage = _c === void 0 ? 'Something went wrong' : _c, onRetry = _a.onRetry;
    return (_jsx("div", { className: "error-screen", children: _jsxs("div", { className: "error-content", children: [_jsx("div", { className: "error-illustration", children: _jsxs("svg", { viewBox: "0 0 200 200", className: "error-icon", children: [_jsx("circle", { cx: "100", cy: "100", r: "80", fill: "none", stroke: "currentColor", strokeWidth: "2" }), _jsx("text", { x: "100", y: "120", fontSize: "60", textAnchor: "middle", fill: "currentColor", children: "!" })] }) }), _jsx("h1", { className: "error-title", children: errorCode }), _jsx("p", { className: "error-description", children: errorMessage }), _jsx("button", { className: "error-button", onClick: onRetry, type: "button", children: "Try Again" })] }) }));
}
