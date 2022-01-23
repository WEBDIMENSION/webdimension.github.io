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
// import { siteMetadata } from "../../gatsby-config"
const Footer = () => {
    const data = (0, gatsby_1.useStaticQuery)((0, gatsby_1.graphql) `
    query Footer {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
    // const Footer = () => {
    return (React.createElement("footer", null,
        React.createElement("p", null,
            React.createElement("small", null,
                "(c) 2021 ",
                data.site?.siteMetadata?.title))));
};
exports.default = Footer;
// export const pageQuery = graphql`
//   query Footer {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
