import { createGlobalStyle } from "styled-components"
import { theme } from "./styled-components/theme"

export default createGlobalStyle`
      html, body {
         font-family: ${theme.font.main};
         font-weight: ${theme.font.main_weight};

         height: 100%; 
         width: 100%;
         background: black;

         overflow: hidden;
      }
`
