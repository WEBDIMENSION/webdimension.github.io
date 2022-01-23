"use strict";
/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
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
const gatsby_plugin_image_1 = require("gatsby-plugin-image");
// import Typography from '@material-ui/core/Typography';
const Bio = () => {
    const data = (0, gatsby_1.useStaticQuery)((0, gatsby_1.graphql) `
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);
    // Set these values by editing "siteMetadata" in gatsby-config.js
    const author = data.site?.siteMetadata?.author;
    const social = data.site?.siteMetadata?.social;
    return (React.createElement("div", { className: "bio" },
        React.createElement(gatsby_plugin_image_1.StaticImage, { className: "bio-avatar", layout: "fixed", formats: ["auto", "png", "avif"], src: "../images/prof.png", width: 50, height: 50, quality: 95, alt: "Profile picture" }),
        author?.name && (React.createElement("p", null,
            "Written by ",
            React.createElement("strong", null, author.name),
            " ",
            author?.summary || null,
            ` `,
            React.createElement("a", { href: `https://twitter.com/${social?.twitter || ``}` }, "You should follow them on Twitter")))));
};
exports.default = Bio;
