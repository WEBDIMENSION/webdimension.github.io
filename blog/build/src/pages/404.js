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
exports.pageQuery = void 0;
const React = __importStar(require("react"));
const gatsby_1 = require("gatsby");
const layout_1 = __importDefault(require("../components/layout"));
const seo_1 = __importDefault(require("../components/seo"));
// const NotFoundPage = ({ data, location }) => {
const NotFoundPage = () => {
    // const siteTitle = data?.site?.siteMetadata?.title
    return (
    // <Layout title={siteTitle}>
    React.createElement(layout_1.default, null,
        React.createElement(seo_1.default, { title: "404: Not Found" }),
        React.createElement("h1", null, "404: Not Found"),
        React.createElement("p", null, "You just hit a route that doesn't exist... the sadness.")));
};
exports.default = NotFoundPage;
exports.pageQuery = (0, gatsby_1.graphql) `
  query NotFoundQuery{
    site {
      siteMetadata {
        title
      }
    }
  }
`;
