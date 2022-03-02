---

title: "GatsbyJS Typescript 化"
date: "2022-03-02 20:18:46"
post_modified: "2022-03-02 20:18:46"
description: "GatsbyJS Blog-starter をTypeScript化する"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJs"
topic_order: "2"
draft: false

---


[参考](https://qiita.com/akifumii/items/4c25f9bbec5bd9c2aa0e)

## Istall Typescript

```bash
# Intall tsc
npx tsc --init
# Add typescript to project
yarn add typescript -D
yarn add yarn add gatsby-plugin-typegen
```

tsconfig.json

```json
{
...
...
...
  plugins: [
...
...
...
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typegen`,  # Plugin 反映
  ],
}
```

## Crate type

```bash
# index.js を typescript化
mv src/pages/index.js src/pages/index.tsx
```

```bash
# ** 一旦 build
yarn build

#  確認
yarn start
# http://localhost:8000
```

`__generated__` 配下に gatsby-types.ts が生成される

## components を typescript 化

```bash
src/components/*.js  -> *.tsx
```

## templates/\*.js を typescript 化

```bash
src/templates/*.js  -> *.tsx
```

```js
// .js を .tsx に変換
// const blogPost = path.resolve(`./src/templates/blog-post.js`)
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
```

### 再起動

```bash
yarn start
# http://localhost:8000
```

### gatsby-node.js の TS 化

```bash
yarn add -D ts-node
```

```bash
mkdir gatsby-blog
touch gatsby-node/index.ts
```

gatsby-node/index.ts  
gatsby-config.json をそのままコピペすればいいということなのだが  
コンパイルエラーがでるため下記のように編集

```ts
import path from "path"
// const { createFilePath } = require(`gatsby-source-filesystem`)
import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

// const path = require(`path`)

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result: any = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes || ""

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// exports.createSchemaCustomization = ({ actions }) => {
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
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
```

gatsby-config.js

```js
"use strict"

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
})

require("./src/__generated__/gatsby-types")

const { createPages, onCreateNode } = require("./gatsby-node/index")

exports.createPages = createPages
exports.onCreateNode = onCreateNode
```

### react-helmet の Type

Install をうながされるので。

```bash
yarn add -D @types/react-helmet
```

## tsconfig.json strict に戻す

```json
{
  "include": ["src/**/*", "gatsby-node/index.ts"],
  "exclude": ["node_modules", "public", "build", "src/templates/blog-post.tsx"],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    //    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "target": "esnext",
    /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    "lib": ["dom", "es2017"],
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    "jsx": "react" /* Specify what JSX code is generated. */,
    "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    "emitDecoratorMetadata": true /* Emit design-type metadata for decorated declarations in source files. */,
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    "rootDir": "./" /* Specify the root folder within your source files. */,
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    "baseUrl": "src" /* Specify the base directory to resolve non-relative module names. */,
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "resolveJsonModule": true,                        /* Enable importing .json files */
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    "outDir": "./build" /* Specify an output folder for all emitted files. */,
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied `any` type.. */,
    "strictNullChecks": true /* When type checking, take into account `null` and `undefined`. */,
    "strictFunctionTypes": true /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */,
    "strictBindCallApply": true /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */,
    "strictPropertyInitialization": true /* Check for class properties that are declared but not set in the constructor. */,
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    "noUnusedLocals": true /* Enable error reporting when a local variables aren't read. */,
    "noUnusedParameters": true /* Raise an error when a function parameter isn't read */,
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    "noImplicitReturns": true /* Enable error reporting for codepaths that do not explicitly return in a function. */,
    "noFallthroughCasesInSwitch": true /* Enable error reporting for fallthrough cases in switch statements. */,
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

## 型を反映する

### pageQuery に名前をつける

```tsx
# index.tsx
export const pageQuery = graphql`
  query index{   # <-
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
```

### PageProps インポート

```tsx
# index.tsx
import { Link, graphql, PageProps  } from "gatsby"
```

```tsx
# index.tsx
const BlogIndex: React.FC<PageProps<GatsbyTypes.indexQuery>> = ({ data, location }) => {
```

src/pages/_.tsx も同様に。
src/components/_.tsx も同様に。

### その他型を反映

例)

```tsx
# src/component/seo.tsx

const Seo = ({ description, lang, meta, title }: { description: string, lang: string, meta: any, title: string }) => {
...
...
  const metaDescription = description || site?.siteMetadata?.description
...
...
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
...
...

```

## ビルド& 再起動

```bash
yarn build
yarn start
# http://localhost
```
