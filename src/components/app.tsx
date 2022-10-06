import styled, { ThemeProvider } from 'styled-components'
import React from 'react'
import background from '../assets/background.png'
import ring from '../assets/ring.png'
import logo from '../assets/logo.png'
import lights from '../assets/lights.png'
import luchador from '../assets/luchador.png'
import GlobalStyle from './global_style'
import PhoneNumberInput from './phone_number_input'
import Registration  from './registration'
import ComingSoon from './coming_soon'
import theme from '../theme'

const AppBase = styled.div`
  height: 100vh;
  width: 100wh;

  @keyframes shrink {
    from { transform: scale(1.2) }
    to   { transform: none; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes slide-up {
    from { transform: translateY(85%); }
    to   { transform: none; }
  }

  @keyframes slide-down {
    from { transform: none; }
    to   { transform: translateY(85%); }
  }
`

const Frame = styled.div`
  max-width: 800px;
  aspect-ratio: 9/16;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`

const Luchador = styled.img`
  position: absolute;
  top: 15%;
  width: 80%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: -1;
  animation: slide-up 1s ease-out forwards, slide-down 1s 1.5s ease-out forwards;
`

const Logo = styled.img`
  display: block;
  width: 45%;
  margin: 13% auto 5%;
  transform-origin: 50% 0;
  animation: shrink 0.5s 2s ease-out backwards;
`

const StyledPhoneNumberInput = styled(PhoneNumberInput)`
  animation: fade-in 0.5s 2.5s ease-out backwards;
`

const Ring = styled.img`
  display: block;
  width: 100%;
`

const Terms = styled.a`
  display: block;
  position: absolute;
  bottom: 0.5em;
  left: 0;
  right: 0;
  width: fit-content;
  margin: 0 auto;
  text-decoration: none;
`

const Background = styled.img`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
`

const Lights = styled.img`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
`

type AppStep = 'phone' | 'registration' | 'ready' | 'menu' | 'trivia' | 'game'
 
export default function App(): React.ReactElement {
  const [step, setStep] = React.useState<AppStep>('phone')

  console.log({ step })
  return (
    <ThemeProvider theme={theme}>
      <AppBase>
        <GlobalStyle />
        <Frame>
          <Logo src={logo} />
          <Luchador src={luchador} />
          { (() =>{
              switch (step) {
                case 'phone':
                  return <StyledPhoneNumberInput onSubmit={() => setStep('registration')} />
                case 'registration':
                  return <Registration onSubmit={() => setStep('ready')} />
                case 'ready':
                  return <ComingSoon />
                default:
                  return 'Work in progress'
              }
            })()
          }
          <Ring src={ring} />
          <Terms href="#">Términos y Condiciones</Terms>
          <Background src={background} />
          <Lights src={lights} />
        </Frame>
      </AppBase>
    </ThemeProvider>
  )
}
