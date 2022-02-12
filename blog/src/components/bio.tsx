/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import BioDescription from "./bioDescription"
import styled from "styled-components"
import IconButton from "@mui/material/IconButton"
import EmailIcon from "@mui/icons-material/Email"

const Bio = () => {
  const data = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
          github {
            url
            repository
          }
          dockerhub {
            url
          }
        }
      }
    }
  `)

  const author = data.site?.siteMetadata?.author
  const github = data.site?.siteMetadata?.github
  const dockerhub = data.site?.siteMetadata?.dockerhub

  return (
    <DivWrapper className="bio">
      <div className={"bioDescription"}>
        <BioDescription isSideBar={false} />
        <p>
          当サイトは<strong>Gatsby(blog-theme)&nbsp;TypeScript化</strong>
          して構築しています。
          <br />
          Hostingは<a href={"https://www.netlify.com"}>Netlify</a>
          を利用しています。
          <br />
          ソースは
          <a href={github?.repository} target={"_blank"}>
            GitHub
          </a>
          (webdimension/gatsby_blog)で全公開しております。
        </p>
      </div>
      <div className={"profArea"}>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "png", "jpg", "avif"]}
          src="../images/profile.jpg"
          width={150}
          height={150}
          quality={95}
          alt="Profile picture"
        />
        <div className={"profDiv"}>Author:&nbsp;{author?.name}</div>
        <div className={"profDiv"}>{author?.summary}</div>
        <div className={"profDiv"}>
          WEB系バックエンドを主軸にフロントエンドまでが守備範囲。
        </div>
        <div className={"profDiv"}>
          <IconButton
            color="inherit"
            size="large"
            aria-label="Contact"
            href={"/contact"}
          >
            <EmailIcon />
          </IconButton>
          <Link to={"/contact/"}>Contact</Link>
        </div>
      </div>

      <div className={"bioDescription"}>
        <h2>Profile</h2>
        <h3>Repositories</h3>
        <ul>
          <li>
            <a href={github?.url} target={"_blank"}>
              GitHub
            </a>
          </li>
          <li>
            <s>GitLab (非公開)</s>
          </li>
          <li>
            <a href={dockerhub?.url} target={"_blank"}>
              DockerHub
            </a>
          </li>
        </ul>
        <h3>Language</h3>
        <ul>
          <li>php</li>
          <li>python</li>
          <li>ShellScript</li>
          <li>React.js</li>
          <li>Vue.js</li>
          <li>html</li>
          <li>CSS</li>
        </ul>
        <h3>OS</h3>
        <ul>
          <li>Windows</li>
          <li>mas</li>
          <li>Ubuntu</li>
          <li>CentOs</li>
          <li>RedHat</li>
          <li>AlmaLinux</li>
          <li>AmazonLinux</li>
          <li>KaliLinux</li>
          <li>ParrotSecurityOS</li>
        </ul>
        <h3>FW</h3>
        <ul>
          <li>Laravel</li>
          <li>Slim3</li>
          <li>gatsby</li>
          <li>next,js</li>
          <li>Flask</li>
        </ul>
        <h3>DataBase</h3>
        <ul>
          <li>MySQL</li>
          <li>Postgres</li>
          <li>MS.Access</li>
          <li>RedShift</li>
          <li>SQLiteK</li>
        </ul>
        <h3>Cloud</h3>
        <ul>
          <li>AWS</li>
          <li>OpenStack</li>
        </ul>
        <h3>Tools</h3>
        <ul>
          <li>Git</li>
          <li>SubVersion</li>
          <li>Ansible</li>
          <li>Terraform</li>
          <li>Docker</li>
          <li>Docker-Compose</li>
          <li>OpenApi</li>
          <li>SchemeSpy</li>
          <li>Tmux</li>
          <li>MS.Office</li>
          <li>Photoshop</li>
          <li>XD</li>
        </ul>
        <h3>Editor</h3>
        <ul>
          <li>Intellij&nbsp;IDEA</li>
          <li>VSCode</li>
          <li>VIM</li>
        </ul>
        <h3>Communication</h3>
        <ul>
          <li>Slack</li>
          <li>ChatWork</li>
          <li>Backlog</li>
          <li>GitHub</li>
          <li>GitLab</li>
          <li>Zoom</li>
          <li>Discord</li>
          <li>GoogleMeet</li>
        </ul>
      </div>
    </DivWrapper>
  )
}

export default Bio
const DivWrapper = styled.div`
  padding: 0.5em;

  .bio-avatar {
    margin: 0 auto;
    picture > img {
      border-radius: 50%;
    }
  }

  .profArea {
    width: 90%;
    background-color: var(--hrefVisitedBackground);
    border: 1px var(--hrefVisitedBackground) solid;
    border-radius: 0.5em;
    padding: 1.5em 0;
    margin: 2em auto;
    .profDiv {
      text-align: center;
    }
  }

  .bioDescription {
    padding: 0 1em;
    line-height: 2em;
    margin-top: 3em;

    h2 {
      border-bottom: 1px var(--colorPrimary) solid;
      padding-bottom: 0.5em;
    }

    h3 {
      margin-top: 1em;
      border-bottom: 1px var(--fontColor) solid;
      padding-bottom: 0.5em;
    }

    ul {
      display: flex;
      margin-top: 0.5em;
      flex-wrap: wrap;

      li {
        padding-left: 1em;
        margin-bottom: 0.5em;
      }
    }
  }
`
