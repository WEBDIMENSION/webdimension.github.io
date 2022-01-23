"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as React from "react"
const react_1 = __importDefault(require("react"));
// import Grid from "@material-ui/core/Grid";
// import Header from "./header"
// import Footer from "./footer"
// import Bio from "../components/bio"
// import Tags from "../components/tags"
// import Mode from "../components/mode"
// import {PageProps} from "gatsby";
// const Layout = ({location, children) => {
const Layout = ({ children }) => {
    // const Layout: React.FC<PageProps> = ({ location },{ children }: { children?: React.ReactNode }) => {
    const rootPath = `/`;
    const isRootPath = location.pathname === rootPath;
    return (react_1.default.createElement("div", { "data-is-root-path": isRootPath, style: {
            backgroundColor: 'var(--bg)',
            color: 'var(--textNormal)',
            transition: 'color 0.2s ease-out, background 0.2s ease-out',
        } }, children));
};
exports.default = Layout;
