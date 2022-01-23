"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageQuery = void 0;
const react_1 = __importDefault(require("react"));
// Components
const gatsby_1 = require("gatsby");
const Categories = ({ pageContext }, { data }) => {
    const { category } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const categoryHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} category with "${category}"`;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, categoryHeader),
        react_1.default.createElement("ul", null, edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (react_1.default.createElement("li", { key: slug },
                react_1.default.createElement(gatsby_1.Link, { to: slug }, title)));
        })),
        react_1.default.createElement(gatsby_1.Link, { to: "/category" }, "All categories")));
};
exports.default = Categories;
exports.pageQuery = (0, gatsby_1.graphql) `
  query tplCategories($category: String){
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
