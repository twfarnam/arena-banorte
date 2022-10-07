import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
  }

  html {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.foreground};
    font-family: Jefith, sans-serif;
    font-size: 16px;
    box-sizing: border-box;
  }

  @media (min-width: 1000px) {
    html {
      font-size: 20px;
    }
  }

  @media (min-width: 1300px) {
    html {
      font-size: 25px;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
  }

  h1 {
    font-weight: normal;
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
