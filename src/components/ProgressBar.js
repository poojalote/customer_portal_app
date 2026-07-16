import { jsx as _jsx } from "react/jsx-runtime";
import '../styles/ProgressBar.css';
export function ProgressBar(_a) {
    var progress = _a.progress, visible = _a.visible;
    if (!visible)
        return null;
    return (_jsx("div", { className: "progress-bar-container", children: _jsx("div", { className: "progress-bar", style: { width: "".concat(Math.min(progress, 100), "%") } }) }));
}
