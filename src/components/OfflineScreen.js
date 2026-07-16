import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../styles/OfflineScreen.css';
export function OfflineScreen(_a) {
    var onRetry = _a.onRetry;
    return (_jsx("div", { className: "offline-screen", children: _jsxs("div", { className: "offline-content", children: [_jsx("div", { className: "offline-illustration", children: _jsxs("svg", { viewBox: "0 0 200 200", className: "offline-icon", children: [_jsx("circle", { cx: "100", cy: "100", r: "80", fill: "none", stroke: "currentColor", strokeWidth: "2" }), _jsx("line", { x1: "50", y1: "50", x2: "150", y2: "150", stroke: "currentColor", strokeWidth: "2" }), _jsx("line", { x1: "150", y1: "50", x2: "50", y2: "150", stroke: "currentColor", strokeWidth: "2" })] }) }), _jsx("h1", { className: "offline-title", children: "No Internet Connection" }), _jsx("p", { className: "offline-description", children: "Please check your internet connection and try again." }), _jsx("button", { className: "offline-button", onClick: onRetry, type: "button", children: "Retry" })] }) }));
}
