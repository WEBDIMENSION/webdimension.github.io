module.exports = {
  siteMetadata: {
    title: `おっさんWEBエンジニア奮闘記`,
    subTitle: `[Infra (インフラ)、Backend (バックエンド)、Frontend (フロントエンド)] `,
    author: {
      name: `NagaMuu`,
      summary: `WEBエンジニア(第一世代) 都内在住 フリーランス`,
      company: `WEBDIMENSION`,
      company_url: ``,
    },
    siteUrl: `${process.env.SITE_URL}`,
    description: `WEBエンジニア(第一世代)のおっさんが現在のWEBにしがみつく奮闘記。インフラ、バックエンド、フロントエンドの備忘録を公開。`,
    social: {
      twitter: `none`,
    },
    github: {
      repository: `https://github.com/WEBDIMENSION/gatasby_blog`,
      url: `https://github.com/WEBDIMENSION/gatasby_blog`,
    },
    dockerhub: {
      url: `https://hub.docker.com/r/`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
      },
    },
    {
      resolve: `@isamrish/gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: [process.env.GOOGLE_ADSENSE_TRACKING_ID],
        head: true, // Optional
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["GOOGLE_ANALYTICS_TRACKING_ID", "GOOGLE_ADSENSE_TRACKING_ID", "SITE_URL"],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-material-ui`,
    // `gatsby-theme-material-ui`,

    // `gatsby-plugin-dark-mode`,
    `gatsby-plugin-typegen`,
    "gatsby-plugin-use-dark-mode",
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `${process.env.SITE_URL}`,
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `${process.env.SITE_URL}`,
        sitemap: `${process.env.SITE_URL}/sitemap/sitemap-index.xml`,
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/contact/thanks"],
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-remove-console",
      options: {
        exclude: ["error", "warn"], // <- will be removed all console calls except these
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
