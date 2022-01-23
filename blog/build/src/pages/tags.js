"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageQuery = void 0;
const react_1 = __importDefault(require("react"));
// Utilities
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
// Components
const react_helmet_1 = require("react-helmet");
const gatsby_1 = require("gatsby");
// const TagsPage = ({
//                       data: {
//                           allMarkdownRemark: { group },
//                           site: {
//                               siteMetadata: { title },
//                           },
//                       },
//                   }) => (
const TagsPage = ({ data, }) => {
    const group = data.allMarkdownRemark.group;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_helmet_1.Helmet, { title: data.site?.siteMetadata?.title }),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Tags"),
            react_1.default.createElement("ul", null, group.map(tag => (react_1.default.createElement("li", { key: tag.fieldValue },
                react_1.default.createElement(gatsby_1.Link, { to: `/tags/${(0, kebabCase_1.default)(tag.fieldValue)}/` },
                    tag.fieldValue,
                    " (",
                    tag.totalCount,
                    ")"))))))));
};
exports.default = TagsPage;
exports.pageQuery = (0, gatsby_1.graphql) `
  query TagsQuery {
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
`;
