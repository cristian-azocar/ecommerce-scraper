import { createGlobalStyle } from 'styled-components';
import theme, { themeVars, getCssVar } from '../system/theme';

const GlobalStyles = createGlobalStyle`
  :root {
    ${themeVars.cssVars}
  }

  * {
    font-family: ${theme.typography.fontFamily};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${getCssVar('colors.background')};
  }
`;

export default GlobalStyles;
