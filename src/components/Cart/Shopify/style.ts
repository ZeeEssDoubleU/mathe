import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      #snipcart,
      #snipcart .snipcart-modal__container {
            z-index: ${({ theme }) => theme.zTop};
            box-shadow: none;
            font-weight: ${({ theme }) => theme.fontMainWeight_Cart};
      }

      /* 
      #snipcart .snipcart-cart__secondary-header, 
      #snipcart .snipcart-item-line, 
      #snipcart .snipcart-cart__footer {
            background-color: black
      } 
      */

      #snipcart .snipcart-cart-button--highlight {
            background-image: linear-gradient(90deg, 
                  ${({ theme }) => theme.appGreen},
                  ${({ theme }) => theme.appGreenLight}
            );
      }

      #snipcart .snipcart__actions--link {
            color: ${({ theme }) => theme.appGreen};
            font-family: ${({ theme }) => theme.fontMain};
            font-weight: ${({ theme }) => theme.fontMainWeight_Link};
      }

      #snipcart .snipcart-item-quantity__button:hover path, 
      #snipcart .snipcart-item-quantity__button:active path, 
      #snipcart .snipcart-item-quantity__button:focus path,
      #snipcart .snipcart-modal__close-icon path, 
      #snipcart .snipcart-cart-header__icon path {
            fill: ${({ theme }) => theme.appGreen};
      }

      #snipcart .snipcart__icon--angled:hover {
            cursor: pointer
      }
`
