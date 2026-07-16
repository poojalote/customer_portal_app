import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';
var container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}
var root = ReactDOM.createRoot(container);
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
