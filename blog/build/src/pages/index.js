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
// import React from "react"
// import React from 'react';
// import type {FC} from 'react';
// import { Link, graphql } from "gatsby"
const gatsby_1 = require("gatsby");
// import Bio from "../components/bio"
const layout_1 = __importDefault(require("../components/layout"));
const seo_1 = __importDefault(require("../components/seo"));
// const BlogIndex = ({ data, location }) => {
const BlogIndex = ({ data }) => {
    // const siteTitle = data.site?.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes;
    if (posts.length === 0) {
        return (
        // <Layout>
        React.createElement(layout_1.default, null,
            React.createElement(seo_1.default, { title: "All posts" }),
            React.createElement("p", null, "No blog posts found. Add markdown posts to \"content/blog\" (or the directory you specified for the \"gatsby-source-filesystem\" plugin in gatsby-config.js).")));
    }
    else {
        return (React.createElement(layout_1.default, null,
            React.createElement(seo_1.default, { title: "All posts" }),
            React.createElement("ol", { style: { listStyle: `none` } }, posts.map(post => {
                const title = post.frontmatter?.title || post.fields?.slug;
                return (React.createElement("li", { key: post.fields?.slug },
                    React.createElement("article", { className: "post-list-item", itemScope: true, itemType: "http://schema.org/Article" },
                        React.createElement("header", null,
                            React.createElement("h2", null,
                                React.createElement(gatsby_1.Link, { to: post.fields?.slug || '', itemProp: "url" },
                                    React.createElement("span", { itemProp: "headline" }, title))),
                            React.createElement("small", null, post.frontmatter?.date)),
                        React.createElement("section", null,
                            React.createElement("p", { dangerouslySetInnerHTML: {
                                    __html: post.frontmatter?.description || post?.excerpt || '',
                                }, itemProp: "description" })))));
            }))));
    }
};
exports.default = BlogIndex;
exports.pageQuery = (0, gatsby_1.graphql) `
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
