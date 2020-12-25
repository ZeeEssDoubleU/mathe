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

      .snipcart-modal__container {
            box-shadow: none !important;
            font-weight: ${props => props.theme.fontCartWeight} !important;
      }

      /* .snipcart-cart__secondary-header, .snipcart-item-line, .snipcart-cart--edit .snipcart-cart__footer {
            background-color: black
      } */

      .snipcart-cart-button--highlight {
            background-image: none;
            background: ${props => props.theme.appGreen}
      }

      .snipcart__actions--link {
            color: ${props => props.theme.appGreen};
            font-family: ${props => props.theme.fontMain};
            font-weight: ${props => props.theme.fontCartLinkWeight} !important;
      }

      .snipcart-modal__close-icon path,
      .snipcart-cart-header__icon path {
            fill: ${props => props.theme.appGreen} !important
      }

      .snipcart-item-quantity__button {
            &:active path, 
            &:focus path {
                  fill: ${props => props.theme.appGreen} !important;
            }
      }
`
