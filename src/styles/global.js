// @ts-nocheck
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      html, body {
         font-family: ${props => props.theme.fontMain};
         font-weight: ${props => props.theme.fontMainWeight};

         height: 100%; 
         width: 100%;
         background: black;

         overflow: hidden;
      }

      // ************
      // snipcart
      // ************ 
      
`
