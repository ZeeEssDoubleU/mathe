import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      html, body {
         font-family: ${({ theme }) => theme.fontMain};
         font-weight: ${({ theme }) => theme.fontMainWeight};

         height: 100%; 
         width: 100%;
         background: black;

         overflow: hidden;
      }
`
