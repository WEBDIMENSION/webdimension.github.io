"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const gatsby_plugin_dark_mode_1 = require("gatsby-plugin-dark-mode");
const core_1 = require("@material-ui/core");
const ThemeToggleButton = () => {
    if (typeof window !== "undefined" && !localStorage.getItem("theme")) {
        window.__setPreferredTheme("dark");
    }
    return (react_1.default.createElement(gatsby_plugin_dark_mode_1.ThemeToggler, null, ({ theme, toggleTheme }) => (react_1.default.createElement("div", null,
        react_1.default.createElement(core_1.Switch, { onChange: e => toggleTheme(e.target.checked ? "dark" : "light"), checked: theme === "dark", color: "primary" }),
        "dark mode"))));
};
exports.default = ThemeToggleButton;
