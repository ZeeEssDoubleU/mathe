import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      html, body {
         font-family: ${({ theme }) => theme.font.main};
         font-weight: ${({ theme }) => theme.font.main_weight};

         height: 100%; 
         width: 100%;
         background: black;

         overflow: hidden;
      }
`
