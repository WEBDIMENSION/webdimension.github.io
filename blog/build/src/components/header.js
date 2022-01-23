"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const gatsby_1 = require("gatsby");
const gatsby_2 = require("gatsby");
// import {siteMetadata} from "../../gatsby-config"
// import styled from "styled-components"
const Header = () => {
    const data = (0, gatsby_2.useStaticQuery)((0, gatsby_2.graphql) `
    query Header {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
    const __PATH_PREFIX__ = '';
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    let siteName;
    if (isRootPath) {
        siteName = React.createElement("h1", { className: "logo" }, data.site?.siteMetadata?.title);
    }
    else {
        siteName = (React.createElement("p", { className: "logo" },
            React.createElement(gatsby_1.Link, { to: rootPath }, data.site?.siteMetadata?.title)));
    }
    return (React.createElement("header", null,
        React.createElement("div", { className: "container" },
            siteName,
            React.createElement("nav", null,
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement(gatsby_1.Link, { to: "/" }, "top")))))));
};
exports.default = Header;
