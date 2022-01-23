import path from 'path'
import {createFilePath} from "gatsby-source-filesystem"
import {GatsbyNode} from 'gatsby'

const _ = require('lodash')

export const onCreateNode: GatsbyNode["onCreateNode"] = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `pages`})
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({actions}) => {
  const {createTypes} = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also, explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}


// export const createPages = async ({graphql, actions}) => {
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const {createPage} = actions
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // categoriesGroup: GatsbyTypes.FileConnection
  // tagsGroup: GatsbyTypes.FileConnection
  const result: any = await graphql<{
    allMarkdownRemark: GatsbyTypes.Query["allMarkdownRemark"] }>(`
     {
       allMarkdownRemark(
         sort: { fields: [frontmatter___date], order: ASC }
         limit: 1000
       ) {
           nodes {
             id
             fields {
               slug
             }
             frontmatter {
               tags
               categories
             }
           }
         }
       tagsGroup: allMarkdownRemark(limit: 1000) {
         group(field: frontmatter___tags) {
           fieldValue
         }
        } 
       categoriesGroup: allMarkdownRemark(limit: 1000) {
         group(field: frontmatter___categories) {
          fieldValue
         }
       } 
     }
   `)


  const { data } = result || 'undefined';
  if( data === undefined) throw 'データが見つかりませんでした';

  // const posts: GatsbyTypes.MarkdownRemarkConnection["nodes"] = result.data.allMarkdownRemark.nodes
  const posts: GatsbyTypes.MarkdownRemarkConnection["nodes"] = result.data.allMarkdownRemark.nodes

  if (posts.length > 0) {
    posts.forEach((post, index:number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields?.slug || '/undefined',
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Extract tag data from query
  const tagTemplate =  path.resolve('src/templates/tags.tsx')
  const tags: GatsbyTypes.FileConnection["group"] = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  const categoryTemplate = path.resolve('src/templates/categories.tsx')
  const categories: GatsbyTypes.FileConnection["group"] = result.data.categoriesGroup.group
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })
}