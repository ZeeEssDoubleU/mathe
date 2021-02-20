import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../Icons/Icon"

// ************
// component
// ************

export default function ContactForm(): ReactElement {
  return (
    <Form
      id="contact-form"
      name="contact-form"
      method="POST"
      action="/success"
      data-netlify="true"
      data-netlify-honeypot="honeypot-field"
    >
      {/* input required by netlify for SSGs like gatsby */}
      <input type="hidden" name="form-name" value="contact-form" />
      {/* hidden honeypot field meant to capture bots */}
      <input name="honeypot-field" style={{ display: "none" }} />
      <input
        required
        type="text"
        id="name"
        name="name"
        className="contact-form-input"
        placeholder="name"
      />
      <input
        required
        type="email"
        id="email"
        name="email"
        className="contact-form-input"
        placeholder="email"
      />
      <input
        required
        id="subject"
        name="subject"
        className="contact-form-input"
        placeholder="subject"
      />
      <textarea
        required
        id="message"
        name="message"
        className="contact-form-input"
        placeholder="message"
        rows={10}
        spellCheck={true}
        // TODO: May need to revise in future in case Grammarly needed
        data-gramm_editor="false"
      />
      <button type="submit">
        <Icon name="send" />
      </button>
    </Form>
  )
}

// ************
// styles
// ************

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 6px 8px;
  }
  .contact-form-input {
    flex-grow: 1;
    background: none;
    padding: 1em;
    border: 1px solid white;
    border-radius: 0.25em;
    color: white;
    /* TODO: consider adding focus animation */
    /* transition: transform 0.2s, box-shadow 0.2s;
		&:required {
			box-shadow: none;
		}
		&:focus {
			transform: scale(1.02);
			box-shadow: 0 0 0 1px
				hsla(${({ theme }) => theme.appGreenPartial}, 0.5);
			&::placeholder {
				opacity: 0;
			}
		} */
  }
  .contact-form-response {
    width: 100%;
    text-align: center;
  }
  textarea {
    width: 100%;
  }
  button {
    display: grid;
    align-content: center;
    justify-content: center;

    width: 64px;
    height: 64px;
    border: 1px solid ${({ theme }) => theme.appGreen};
    margin: 16px auto;

    background: none;
    border-radius: 50%;
    transition: background 200ms;
    svg {
      height: 30px;
      width: 30px;
      margin: 0 auto;
      fill: white;
    }
    &:hover {
      cursor: pointer;
      background: hsla(${({ theme }) => theme.appGreenPartial}, 0.5);
      svg {
        fill: white;
      }
    }
  }
`
