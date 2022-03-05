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
import GitHubApi from "./githubApi"
import DockerHubApi from "./dockehubApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGitlab, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faIdCard, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons"

const Bio = () => {
  const { site } = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
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

  const author = site?.siteMetadata?.author
  const github = site?.siteMetadata?.github
  const dockerhub = site?.siteMetadata?.dockerhub

  return (
    <DivWrapper className="bio">
      <div className={"bioDescription"}>
        <BioDescription isSideBar={false} />
        <p>
          当サイトは<strong>Gatsby(blog-theme)&nbsp;TypeScript化</strong>
          して構築しています。
          <br />
          Hostingは &nbsp;
          <s>Netlify</s>
          &nbsp;
          <FontAwesomeIcon icon={faGithub} />
          <a href={"https://github.com/"} target={"_blank"} rel="noreferrer">
            GitHub
          </a>
          &nbsp; を利用しています。
          <br />
          ソースは
          <FontAwesomeIcon icon={faGithub} />
          <a href={github?.repository} target={"_blank"} rel="noreferrer">
            GitHub
          </a>
          (webdimension/gatsby_blog)で全公開しております。
        </p>
      </div>
      <div className={"profArea"}>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp"]}
          src="../images/profile.jpg"
          width={150}
          height={150}
          quality={95}
          alt="Profile picture"
        />
        <div className={"profDiv"}>
          <FontAwesomeIcon icon={faAt} />
          Author:&nbsp;{author?.name}
        </div>
        <div className={"profDiv"}>{author?.summary}</div>
        <div className={"profDiv"}>WEB系バックエンドを主軸にインフラからフロントエンドまでが守備範囲。</div>
        <div className={"profDiv"}>
          <FontAwesomeIcon icon={faEnvelope} />
          <Link to={"/contact/"}>Contact</Link>
        </div>
      </div>

      <div className={"bioDescription"}>
        <h2>
          <FontAwesomeIcon icon={faIdCard} />
          Profile
        </h2>
        <h3>Repositories</h3>
        <GitHubApi />
        <div>
          <h4>
            <FontAwesomeIcon icon={faGitlab} />
            GitLab
          </h4>
          <ul>
            <li>
              <s>(非公開)</s>
            </li>
          </ul>
        </div>
        <DockerHubApi url={dockerhub?.url} />
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

    h4 {
      margin-top: 1em;
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
