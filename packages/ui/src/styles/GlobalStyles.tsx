import { css } from '@linaria/core';
import theme, { themeVars, getCssVar } from '../system/theme';
import normalize from './normalize';
import './fonts/font-face.css';

const GlobalStyles = css`
  :global {
    ${normalize}

    :root {
      ${themeVars.cssVars}
    }

    html {
      line-height: ${theme.typography.body1.lineHeight};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography.body1.fontSize};
      font-weight: ${theme.typography.body1.fontWeight};
      letter-spacing: ${theme.typography.body1.letterSpacing};
      color: ${getCssVar('colors.text.primary')};
      background: ${getCssVar('colors.background')};
      position: relative;
      min-height: 100%;
    }

    *,
    *::before,
    *::after {
      border-width: 0;
      border-style: solid;
      box-sizing: border-box;
    }

    button {
      background: transparent;
      cursor: pointer;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    ul,
    ol,
    dd {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }

    p {
      margin: 0;
    }
  }
`;

export default GlobalStyles;
