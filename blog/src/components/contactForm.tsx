/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import * as React from "react"
import React from "react";
import {useState} from "react";
// import { makeStyles, TextField, Button } from "@material-ui/core";
import {TextField, Button} from "@mui/material";
import styled from "styled-components";
// import red from '@material-ui/core/colors/red';
// import blue from '@material-ui/core/colors/blue';

// import {useStaticQuery, graphql} from "gatsby"
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import styled from "styled-components"
// import {StaticImage} from "gatsby-plugin-image"

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    status: {
      form: React.CSSProperties['color'],
    }
  }
}

const ContactForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");


  const handleChange = event => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        console.log(event.target.value)
        break;
      case "email":
        // setEmail(event.target.value);
        console.log(event.target.value)
        break;
      case "subject":
        // setSubject(event.target.value);
        console.log(event.target.value)
        break;
      case "message":
        // setMessage(event.target.value);
        console.log(event.target.value)
        break;
      default:
        console.log(event.target.value)
        console.log("key not found");
    }
  };

  const canSubmit = () => {
    if (name === "") return true;
    if (email === "") return true;
    if (subject === "") return true;
    // if (message === "") return true;

    return false;
  };

  const CssTextField = styled(TextField)({
    color: "var(-- fontColor)",
    backgroundColor: "var(--bgColorPrimary)",
    '& label.Mui-focused': {
      color: "var(--hover)",
    },
    '&.Mui-focused fieldset': {
      borderColor: "var(--hover)",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: "var(--colorPrimary)",
        color: "var(--red)",
      },
      '&:hover fieldset': {
        borderColor: "var(--blue)",
      },
    },
  });

  return (
    <DivWrapper>
      <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact"/>
        <input type="hidden" name="bot-field"/>

        <div className={"inputBlock"}>
          <label htmlFor={"name"}>名前 : </label>
          <input type={"text"} name={"name"} onChange={handleChange}/>
        </div>

        <div className={"inputBlock"}>
          <label htmlFor={"email"}>Email : </label>
          <input type={"text"} name={"emai"} onChange={handleChange}/>
        </div>

          <div className={"inputBlock"}>
          <label htmlFor={"subject"}>subject : </label>
            <input type={"text"} name={"subject"} onChange={handleChange}/>
          </div>

        <div className={"inputBlock"}>
          <label htmlFor={"message"}>Message : </label>
          <textarea
            nam={"message"}
            rows={12}
          >
        </textarea>
        </div>

        <div className={"inputBlock"}>
        <Button
          type="submit"
          variant="contained"
          // fullWidth
          // disabled={canSubmit()}
          margin="normal"
        >
          送信
        </Button>
        </div>
      </form>
    </DivWrapper>
  )
}

export default ContactForm

const DivWrapper = styled.div`
  form {
    width: 100%;
    input, textarea,
    label  {
      //display: block;
      //margin: auto;
      width: 100%;
      //background-color: #ff0;
      //font-size: 1.2em;
    }
    div.inputBlock {
      width: 95%;
      margin: 0 auto 1em ;
    }
    input, textarea {
      color: var(--fontColor);
      border: 2px solid var(--hrefVisitedBackground);  
      background-color: var(--hrefBackground);
      padding: 0.5em;
    }
  }
`
