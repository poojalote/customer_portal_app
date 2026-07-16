import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import '../styles/Toast.css';
export function Toast(_a) {
    var message = _a.message, _b = _a.duration, duration = _b === void 0 ? 3000 : _b, _c = _a.type, type = _c === void 0 ? 'info' : _c;
    var _d = useState(true), visible = _d[0], setVisible = _d[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setVisible(false);
        }, duration);
        return function () { return clearTimeout(timer); };
    }, [duration]);
    if (!visible)
        return null;
    return (_jsx("div", { className: "toast toast--".concat(type), role: "status", children: message }));
}
