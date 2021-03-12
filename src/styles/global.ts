// @ts-nocheck
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

      // ************
      // snipcart
      // ************ 

      .snipcart-modal__container {
            box-shadow: none !important;
            font-weight: ${({ theme }) => theme.fontCartWeight} !important;
      }

      /* .snipcart-cart__secondary-header, .snipcart-item-line, .snipcart-cart--edit .snipcart-cart__footer {
            background-color: black
      } */

      .snipcart-cart-button--highlight {
            background-image: none;
            background: ${({ theme }) => theme.appGreen}
      }

      .snipcart__actions--link {
            color: ${({ theme }) => theme.appGreen};
            font-family: ${({ theme }) => theme.fontMain};
            font-weight: ${({ theme }) => theme.fontCartLinkWeight} !important;
      }

      .snipcart-cart-header .snipcart__icon path,
      .snipcart-item-quantity__button:active path, 
      .snipcart-item-quantity__button:focus path {
                  fill: ${({ theme }) => theme.appGreen} !important;
            }
      }
`