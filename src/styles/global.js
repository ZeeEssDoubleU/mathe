// @ts-nocheck
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      html, body {
         font-family: ${props => props.theme.fontMain};
         font-weight: ${props => props.theme.fontMainWeight};
         background: black;

         /* to adjust for changing mobile view ports */
         height: 100%;

         overflow: hidden;
      }
`
