"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageQuery = void 0;
const react_1 = __importDefault(require("react"));
const gatsby_1 = require("gatsby");
// Components
const Tags = ({ pageContext }, { data }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, tagHeader),
        react_1.default.createElement("ul", null, edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (react_1.default.createElement("li", { key: slug },
                react_1.default.createElement(gatsby_1.Link, { to: slug }, title)));
        })),
        react_1.default.createElement(gatsby_1.Link, { to: "/tags" }, "All tags")));
};
exports.default = Tags;
exports.pageQuery = (0, gatsby_1.graphql) `
  query tplTags($tag: String){
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
