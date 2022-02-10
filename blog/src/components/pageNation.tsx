import React from "react";
import {Link} from "gatsby";
import styled from "styled-components";
// import { makeStyles } from "@mui/material/styles";
// import { Pagination } from "@mui/lab";


const PageNation = ({pageContext}) => {
  const {numPages} = pageContext
  // console.log(pageContext.currentPage)
  const currentPage = pageContext.currentPage
  const linkPrefix = pageContext.linkPrefix
  const linkSuffix = pageContext.linkSuffix
  return (
    <nav>
      <UlWrapper>
        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`}
              className={`${i + 1}` == currentPage ? "thisPage" : "etherPage"}
          >
            <Link to={`${linkPrefix}${i === 0 ? "" : linkSuffix }${i === 0 ? "" : i + 1}/`}>{i + 1}</Link>
          </li>
        ))}
      </UlWrapper>
    </nav>
  );
};
export default PageNation;
const UlWrapper = styled.ul`
  display: flex;
  justify-content: center;

  li {
    display: block;
    width: 3em;
    text-align: center;
    margin: 0 0.2em;
  }
  li.thisPage {
    background-color: var(--colorSecondary);
  }
  li.etherPage {
    background-color: var(--colorPrimary);
  }

`
