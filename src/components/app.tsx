import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import '../firebase'
// @ts-ignore
import background from '../assets/background.png?w=800&webp'
// @ts-ignore
import background2x from '../assets/background.png?w=1600&webp'
// @ts-ignore
import ring from '../assets/ring.png?w=800&webp'
// @ts-ignore
import ring2x from '../assets/ring.png?w=1600&webp'
// @ts-ignore
import logo from '../assets/logo.png?w=400&webp'
// @ts-ignore
import logo2x from '../assets/logo.png?w=800&webp'
// @ts-ignore
import lights from '../assets/lights.png?&w=800&webp'
// @ts-ignore
import lights2x from '../assets/lights.png?&w=1600&webp'
// @ts-ignore
// import luchador from '../assets/luchador.png?webp'
import GlobalStyle from './global_style'
import RegistrationForm from './registration_form'
import ComingSoon from './coming_soon'
import theme from '../theme'
import useForceUpdate from '../hooks/use_force_update'

const AppBase = styled.div`
  min-height: 100vh;
  width: 100wh;
  overflow-hidden;

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
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`

// const Luchador = styled.img`
//   position: absolute;
//   top: 15%;
//   width: 80%;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   z-index: -1;
//   /* animation: slide-up 1s ease-out forwards, slide-down 1s 1.5s ease-out forwards; */
// `

const Logo = styled.img`
  display: block;
  width: 45%;
  margin: 13% auto 5%;
  transform-origin: 50% 0;
  /* animation: shrink 0.5s 2s ease-out backwards; */
  animation: shrink 0.5s 0.5s ease-out backwards;
`

const FadeInContainer = styled.div`
  /* animation: fade-in 0.5s 2.5s ease-out backwards; */
  animation: fade-in 0.5s 1s ease-out backwards;
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

// type AppPage = 'ready' | 'menu' | 'trivia' | 'game'
 
export default function App(): React.ReactElement {
  // const [page, setPage] = React.useState<AppPage>('ready')
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
  })

  return (
    <ThemeProvider theme={theme}>
      <AppBase>
        <GlobalStyle />
        { !loading &&
          <Frame>
            <Logo srcSet={`${logo} 1x, ${logo2x} 2x`} />
            {/* <Luchador src={luchador} /> */}
            <FadeInContainer>
              { (() => {
                  if (user?.displayName)
                    return <ComingSoon />
                  else
                    return <RegistrationForm onSubmit={() => forceUpdate()} />
                })()
              }
            </FadeInContainer>
            <Ring srcSet={`${ring} 1x, ${ring2x} 2x`} />
            <Terms href="#">Términos y Condiciones</Terms>
            <Background srcSet={`${background} 1x, ${background2x} 2x`} />
            <Lights srcSet={`${lights} 1x, ${lights2x} 2x`} />
          </Frame>
        }
      </AppBase>
    </ThemeProvider>
  )
}
