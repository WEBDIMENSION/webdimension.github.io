"use strict";
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_helmet_1 = require("react-helmet");
const gatsby_1 = require("gatsby");
const Seo = ({ description, lang, meta, title, }
// { description, lang, meta, title }
) => {
    const { site } = (0, gatsby_1.useStaticQuery)((0, gatsby_1.graphql) `
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `);
    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata?.title;
    return (React.createElement(react_helmet_1.Helmet, { htmlAttributes: {
            lang,
        }, title: title, titleTemplate: defaultTitle ? `%s | ${defaultTitle}` : undefined, meta: [
            {
                name: `description`,
                content: metaDescription,
            },
            {
                property: `og:title`,
                content: title,
            },
            {
                property: `og:description`,
                content: metaDescription,
            },
            {
                property: `og:type`,
                content: `website`,
            },
            {
                name: `twitter:card`,
                content: `summary`,
            },
            {
                name: `twitter:creator`,
                content: site.siteMetadata?.social?.twitter || ``,
            },
            {
                name: `twitter:title`,
                content: title,
            },
            {
                name: `twitter:description`,
                content: metaDescription,
            },
        ].concat(meta) }));
};
Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};
Seo.propTypes = {
    description: prop_types_1.default.string,
    lang: prop_types_1.default.string,
    meta: prop_types_1.default.arrayOf(prop_types_1.default.object),
    title: prop_types_1.default.string.isRequired,
};
exports.default = Seo;
