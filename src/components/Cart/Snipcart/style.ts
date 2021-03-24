import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      #snipcart,
      #snipcart .snipcart-modal__container {
            z-index: ${({ theme }) => theme.z.top};
            box-shadow: none;
            font-weight: ${({ theme }) => theme.font.main_weight_cart};
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
                  ${({ theme }) => theme.color.app_green},
                  ${({ theme }) => theme.color.app_lightGreen}
            );
      }

      #snipcart .snipcart__actions--link {
            color: ${({ theme }) => theme.color.app_green};
            font-family: ${({ theme }) => theme.font.main};
            font-weight: ${({ theme }) => theme.font.main_weight_link};
      }

      #snipcart .snipcart-item-quantity__button:hover path, 
      #snipcart .snipcart-item-quantity__button:active path, 
      #snipcart .snipcart-item-quantity__button:focus path,
      #snipcart .snipcart-modal__close-icon path, 
      #snipcart .snipcart-cart-header__icon path {
            fill: ${({ theme }) => theme.color.app_green};
      }

      #snipcart .snipcart__icon--angled:hover {
            cursor: pointer;
      }
      
      #snipcart .snipcart-featured-payment-methods__list{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
      }

      #snipcart .snipcart__icon--brand {
            width: auto;
            height: 48px;
      }
`
