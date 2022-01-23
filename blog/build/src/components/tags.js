"use strict";
/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
// Components
const react_helmet_1 = require("react-helmet");
const gatsby_1 = require("gatsby");
const Tags = () => {
    const data = (0, gatsby_1.useStaticQuery)((0, gatsby_1.graphql) `
    query  tagsQuery{
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);
    const title = data.site.siteMetadata?.title;
    const group = data.allMarkdownRemark?.group;
    return (react_1.default.createElement("div", { className: "tags" },
        react_1.default.createElement(react_helmet_1.Helmet, { title: title }),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Tags"),
            react_1.default.createElement("ul", null, group.map(tag => (react_1.default.createElement("li", { key: tag.fieldValue },
                react_1.default.createElement(gatsby_1.Link, { to: `/tags/${(0, kebabCase_1.default)(tag.fieldValue)}/` },
                    tag.fieldValue,
                    " (",
                    tag.totalCount,
                    ")"))))))));
};
exports.default = Tags;
