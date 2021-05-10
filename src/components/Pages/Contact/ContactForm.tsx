import React, { useState, ReactElement, FormEvent, ChangeEvent } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import axios from "axios"
import loadable from "@loadable/component"
// import components
const Icon = loadable(() => import("../../Icon"))

// ************
// component
// ************

export default function ContactForm(): ReactElement {
	const [formData, setFormData] = useState({
		"form-name": "contact-form",
		"honeypot-field": "",
		name: "",
		email: "",
		subject: "",
		message: "",
	})

	// encode form data
	function encode(data: typeof formData) {
		// use entries for better typing
		return Object.entries(data)
			.map((entry) => {
				const key_encoded = encodeURIComponent(entry[0])
				const value_encoded = encodeURIComponent(entry[1])
				return `${key_encoded}=${value_encoded}`
			})
			.join("&")
	}

	// handle form submit
	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const response = await axios({
				url: "/",
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				data: encode(formData),
			})
			console.log("Form submission recieved! :D") // ? debug

			navigate("/success")
		} catch (error) {
			alert(error)
		}
	}

	// handle form change
	function handleChange(
		event: ChangeEvent<
			HTMLFormElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<Form
			id="contact-form"
			name="contact-form"
			method="POST"
			action="/success"
			data-netlify="true"
			data-netlify-honeypot="honeypot-field"
			onSubmit={handleSubmit}
		>
			{/* input required by netlify for SSGs like gatsby */}
			<input type="hidden" name="form-name" value="contact-form" />
			{/* hidden honeypot field meant to capture bots */}
			<input
				name="honeypot-field"
				style={{ display: "none" }}
				value={formData["honeypot-field"]}
				onChange={handleChange}
			/>
			<input
				required
				type="text"
				name="name"
				className="contact-form-input"
				placeholder="name"
				value={formData["name"]}
				onChange={handleChange}
			/>
			<input
				required
				type="email"
				name="email"
				className="contact-form-input"
				placeholder="email"
				value={formData["email"]}
				onChange={handleChange}
			/>
			<input
				required
				name="subject"
				className="contact-form-input"
				placeholder="subject"
				value={formData["subject"]}
				onChange={handleChange}
			/>
			<textarea
				required
				name="message"
				className="contact-form-input"
				placeholder="message"
				rows={10}
				spellCheck={true}
				// TODO: May need to revise in future in case Grammarly needed
				data-gramm_editor="false"
				value={formData["message"]}
				onChange={handleChange}
			/>

			<button aria-label="submit form">
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
      padding: 1rem;
      border: 1px solid white;
      border-radius: 04px;
      color: white;
      /* TODO: consider adding focus animation */
      transition: transform 0.2s, box-shadow 0.2s;
      &:required {
         box-shadow: none;
      }
      &:focus {
         transform: scale(1.02);
         box-shadow: 0 0 0 1px ${({ theme }) => theme.color.hover_bg};
         &::placeholder {
            opacity: 0;
         }
      }
   }
   .contact-form-response {
      width: 100%;
      text-align: center;
   }
   textarea {
      width: 100%;
   }
   button {
      color: white,
      display: grid;
      align-content: center;
      justify-content: center;

      width: 64px;
      height: 64px;
      border: 1px solid ${({ theme }) => theme.color.app_green};
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
         background: ${({ theme }) => theme.color.hover_bg};
         svg {
            fill: white;
         }
      }
   }
`
