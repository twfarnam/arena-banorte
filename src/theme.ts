const theme = {
  background: '#ec2340',
  foreground: 'white',
  errorColor: '#03dcc5',
}

export { theme as default }

type ThemeType = typeof theme

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ThemeType {}
}
