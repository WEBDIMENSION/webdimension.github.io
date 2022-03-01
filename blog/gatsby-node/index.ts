import path from "path"
import { createFilePath } from "gatsby-source-filesystem"
import { GatsbyNode } from "gatsby"

import _ from "lodash"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions

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
  const { createPage } = actions
  const postsPerPage = 10 //記事一覧に表示させる記事数

  const inDraft = process.env.NODE_ENV === "production" ? [false] : [true, false]
  console.log(inDraft)
  const result: any = await graphql<{
    allMarkdownRemark: GatsbyTypes.Query["allMarkdownRemark"]
  }>(`
     {
       allMarkdownRemark(
       filter: { frontmatter: { draft: { in: [ ${inDraft} ] } } }
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
               draft
             }
           }
         }
     }
   `)

  const { data } = result || "undefined"
  if (data === undefined) throw "データが見つかりませんでした"

  // const posts: GatsbyTypes.MarkdownRemarkConnection["nodes"] = result.data.allMarkdownRemark.nodes
  const allPosts: GatsbyTypes.MarkdownRemarkConnection["nodes"] = result.data.allMarkdownRemark.nodes

  // let drafts = posts.reduce((drafts, edge) => {
  //   const edgeDraft: any = edge?.frontmatter?.draft
  //   return edgeDraft ? drafts.concat(edgeDraft) : drafts
  // }, [])
  // console.log(drafts)

  const posts = allPosts.filter(post => {
    return post.frontmatter?.draft == false
  })

  const drafts = allPosts.filter(post => {
    return post.frontmatter?.draft == true
  })
  // console.log(drafts)

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  if (drafts.length > 0) {
    drafts.forEach((draft, index: number) => {
      const previousPostId = index === 0 ? null : drafts[index - 1].id
      const nextPostId = index === drafts.length - 1 ? null : drafts[index + 1].id

      // console.log(post.frontmatter?.draft)
      createPage({
        path: "/blog" + draft.fields?.slug || "/undefined",
        component: blogPost,
        context: {
          id: draft.id,
          previousPostId,
          nextPostId,
          draft: draft.frontmatter?.draft,
        },
      })
    })
    const DraftTemplate = path.resolve("src/templates/blog-drafts.tsx")
    const numPages = Math.ceil(drafts.length / postsPerPage) //記事数 ÷ 表示させる記事数

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/drafts/` : `/blog/drafts/page/${i + 1}/`,
        component: DraftTemplate,
        context: {
          limit: postsPerPage, //表示させる記事の制限数
          skip: i * postsPerPage, //新しい記事からスキップさせる記事数
          currentPage: i + 1,
          numPages: numPages,
          linkPrefix: `/blog/draft`,
          linkSuffix: "/page/",
          draft: inDraft,
        },
      })
    })
  }

  if (posts.length > 0) {
    posts.forEach((post, index: number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      // console.log(post.frontmatter?.draft)
      createPage({
        path: "/blog" + post.fields?.slug || "/undefined",
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          draft: post.frontmatter?.draft,
        },
      })
    })
  }

  const listTemplate = path.resolve("src/templates/blog-list.tsx") //パス
  const numPages = Math.ceil(posts.length / postsPerPage) //記事数 ÷ 表示させる記事数

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/page/${i + 1}/`,
      component: listTemplate,
      context: {
        limit: postsPerPage, //表示させる記事の制限数
        skip: i * postsPerPage, //新しい記事からスキップさせる記事数
        currentPage: i + 1,
        numPages: numPages,
        linkPrefix: `/blog`,
        linkSuffix: "/page/",
        draft: inDraft,
      },
    })
  })

  ////////////////////////////////////////////////
  ///  Tags
  ////////////////////////////////////////////////
  // console.log(posts)
  let tags = posts.reduce((tags, edge) => {
    // console.log(edge?.frontmatter?.tags)
    const edgeTags: any = edge?.frontmatter?.tags
    return edgeTags ? tags.concat(edgeTags) : tags
  }, [])
  // 重複削除
  tags = [...new Set(tags)]
  // console.log(tags)

  const tagTemplate = path.resolve("src/templates/tags.tsx")

  tags.forEach(item => {
    const tag = item
    const tagsCount = posts.filter(post => post.frontmatter?.tags?.includes(item)).length
    const numPages = Math.ceil(tagsCount / postsPerPage) //分割されるページの数
    for (let index = 0; index < numPages; index++) {
      const pageNumber = index + 1
      let prefix = ""
      if (pageNumber === 1) {
        prefix = `/blog/tags/${_.kebabCase(tag)}/`
      } else {
        prefix = `/blog/tags/${_.kebabCase(tag)}/page/${pageNumber}/`
      }
      createPage({
        path: prefix,
        component: tagTemplate,
        context: {
          limit: postsPerPage, //追加
          skip: index * postsPerPage, //追加
          currentPage: pageNumber, //追加
          numPages: numPages,
          tag: tag,
          linkPrefix: `/blog/tags/${_.kebabCase(tag)}`,
          linkSuffix: "/page/",
          draft: inDraft,
        },
      })
    }
  })

  ////////////////////////////////////////////////
  ///  Categories
  ////////////////////////////////////////////////
  let categories = posts.reduce((categories, edge) => {
    const edgeCategories: any = edge?.frontmatter?.categories
    // console.log(edgeCategories ? tags.concat(edgeCategories) : categories)
    // console.log(edge?.frontmatter?.categories)

    return edgeCategories ? categories.concat(edgeCategories) : categories
  }, [])
  // 重複削除
  categories = [...new Set(categories)]
  // console.log("category")
  // console.log(categories)

  const categoriesTemplate = path.resolve("src/templates/categories.tsx")

  categories.forEach(item => {
    const category = item
    const categoriesCount = posts.filter(post => post.frontmatter?.categories?.includes(item)).length
    const numPages = Math.ceil(categoriesCount / postsPerPage) //分割されるページの数
    for (let index = 0; index < numPages; index++) {
      const pageNumber = index + 1
      let prefix = ""
      if (pageNumber === 1) {
        prefix = `/blog/categories/${_.kebabCase(category)}/`
      } else {
        prefix = `/blog/categories/${_.kebabCase(category)}/page/${pageNumber}/`
      }
      createPage({
        path: prefix,
        component: categoriesTemplate,
        context: {
          limit: postsPerPage, //追加
          skip: index * postsPerPage, //追加
          currentPage: pageNumber, //追加
          numPages: numPages,
          category: category,
          linkPrefix: `/blog/categories/${_.kebabCase(category)}`,
          linkSuffix: "/page/",
          draft: inDraft,
        },
      })
    }
  })
}
