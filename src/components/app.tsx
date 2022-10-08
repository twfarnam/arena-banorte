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
import Menu from './menu'
import Ready from './ready'
import Game from './game'
import Trivia from './trivia'
import LeaderBoard from './leader_board'
import theme from '../theme'

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
  display: flex;
  flex-flow: column nowrap;
  max-width: 800px;
  min-height: 100vh;
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
  position: absolute;
  bottom: 0;
  z-index: -1;
`

const Spacer = styled.div`
  flex-grow: 1;
`

const Terms = styled.a`
  display: block;
  width: fit-content;
  margin: 10px auto;
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

export type AppPage = 'ready' | 'menu' | 'trivia' | 'game' | 'leader-board'
 
export default function App(): React.ReactElement {
  const [page, setPage] = React.useState<AppPage>('menu')
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

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
                  if (!user?.displayName) {
                    return <RegistrationForm onSubmit={() => setPage('ready')} />
                  } else if (page == 'ready' && window.location.search.includes('withGame')) {
                    return <Ready onPlay={() => setPage('menu')} />
                  } else if (page == 'ready' || !window.location.search.includes('withGame')) {
                    return <ComingSoon />
                  } else if (page == 'menu') {
                    return <Menu onSetPage={setPage} />
                  } else if (page == 'game') {
                    return <Game onReturn={() => setPage('menu')} />
                  } else if (page == 'trivia') {
                    return <Trivia onReturn={() => setPage('menu')} />
                  } else if (page == 'leader-board') {
                    return <LeaderBoard  onReturn={() => setPage('menu')} />
                  }
                })()
              }
            </FadeInContainer>
            <Spacer />
            <Terms href="#">Términos y Condiciones</Terms>
            <Ring srcSet={`${ring} 1x, ${ring2x} 2x`} />
            <Background srcSet={`${background} 1x, ${background2x} 2x`} />
            <Lights srcSet={`${lights} 1x, ${lights2x} 2x`} />
          </Frame>
        }
      </AppBase>
    </ThemeProvider>
  )
}
