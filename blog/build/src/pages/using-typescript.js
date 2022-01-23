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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
// If you don't want to use TypeScript you can delete this file!
const React = __importStar(require("react"));
const gatsby_1 = require("gatsby");
const layout_1 = __importDefault(require("../components/layout"));
const seo_1 = __importDefault(require("../components/seo"));
const UsingTypescript = ({ data, path,
// location,
 }) => (React.createElement(layout_1.default, null,
    React.createElement(seo_1.default, { title: "Using TypeScript" }),
    React.createElement("h1", null, "Gatsby supports TypeScript by default!"),
    React.createElement("p", null,
        "This means that you can create and write ",
        React.createElement("em", null, ".ts/.tsx"),
        " files for your pages, components etc. Please note that the ",
        React.createElement("em", null, "gatsby-*.js"),
        " files (like gatsby-node.js) currently don't support TypeScript yet."),
    React.createElement("p", null,
        "For type checking you'll want to install ",
        React.createElement("em", null, "typescript"),
        " via npm and run ",
        React.createElement("em", null, "tsc --init"),
        " to create a ",
        React.createElement("em", null, "tsconfig"),
        " file."),
    React.createElement("p", null,
        "You're currently on the page \"",
        path,
        "\" which was built on",
        " ",
        data.site.buildTime,
        "."),
    React.createElement("p", null,
        "To learn more, head over to our",
        " ",
        React.createElement("a", { href: "https://www.gatsbyjs.com/docs/typescript/" }, "documentation about TypeScript"),
        "."),
    React.createElement(gatsby_1.Link, { to: "/" }, "Go back to the homepage")));
exports.default = UsingTypescript;
exports.query = (0, gatsby_1.graphql) `
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
