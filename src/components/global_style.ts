import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
  }

  html {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.foreground};
    font-family: Jefith, sans-serif;
    font-size: 13px;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
  }

  a:hover {
    opacity: .75;
  }

  @font-face {
    font-family: Jefith;
    src: url('/fonts/jefith.woff2');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
`
