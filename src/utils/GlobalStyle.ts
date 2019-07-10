import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  a {
  color: inherit;
  text-decoration: none;
  &:link,
  &:visited {
    text-decoration: none;
  }
}
`;

export default GlobalStyle;
