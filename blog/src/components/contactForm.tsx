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
    <FormWrapper
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action={"/contact/thanks/"}
    >
      <input type="hidden" name="form-name" value="contact"/>
      <input type="hidden" name="bot-field"/>

      <div className={"inputBlock"}>
        <label htmlFor={"name"}>名前 : </label>
        <input
          type={"text"}
          name={"name"}
          onChange={handleChange}
          placeholder={"山田太郎"}
        />
      </div>

      <div className={"inputBlock"}>
        <label htmlFor={"email"}>Email : </label>
        <input
          type={"text"}
          name={"email"}
          onChange={handleChange}
          placeholder={"account@abcd.com"}
        />
      </div>

      <div className={"inputBlock"}>
        <label htmlFor={"subject"}>subject : </label>
        <input
          type={"text"}
          name={"subject"}
          onChange={handleChange}
          placeholder={"件名"}
        />
      </div>

      <div className={"inputBlock"}>
        <label htmlFor={"message"}>Message : </label>
        <textarea
          name={"message"}
          rows={12}
          onChange={handleChange}
          placeholder={"お問い合わせ内容"}
        >
        </textarea>
      </div>

      <div className={"inputBlock, submitButton"}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          // disabled={canSubmit()}
          // margin="normal"
          // size={"large"}
        >
          送信
        </Button>
      </div>
    </FormWrapper>
  )
}

export default ContactForm

const FormWrapper = styled.form`
  form {
    //input, textarea,
    //label  {
    //display: block;
    //margin: auto;
    //background-color: #ff0;
    //font-size: 1.2em;
  }

  div.inputBlock {

    width: 100%;
    //width: 92%;

    //padding: 0.5em;
    margin: 0 auto 0.2em;
    //width: 90%;
    //margin-bottom: 1em;
  }

  input, textarea {
    border: 2px solid var(--hrefVisitedBackground);
    background-color: var(--hrefBackground);
    //margin: 0.5em;
    color: var(--fontColor);
    font-size: var(--fontSizeH3);
    //padding: 4px;
  }

  input, textarea, label {
    margin: 0 auto;
    width: 92%;
    //color: var(--fontColor);
    padding: 8px;
    display: block;
  }
  label {
    padding-left: 4px;
  }
  .submitButton {
    margin: 1em auto;
    width: 94%;
    button {
      font-size: var(--fontSizeH6);
    }
  }
`
