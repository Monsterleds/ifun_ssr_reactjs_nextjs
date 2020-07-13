import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
            margin: 0;
            padding: 0;
            outline: 0;
            box-sizing: border-box;
          }

          body {
            background: #F0F0F5;
            padding: 0 88px;
          }

          body, button, span, a, input {
            -webkit-font-smoothing: antialiased;
            font-family: 'Raleway', sans-serif;
          }

          a {
            text-decoration: none;
          }

          a, h1 {
            color: #080077;
          }

          a, button {
            cursor: pointer;
          }

          li {
            list-style-type: none;
          }
`;