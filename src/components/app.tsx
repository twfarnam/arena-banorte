import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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
import GlobalStyle from './global_style'
import RegistrationForm from './registration_form'
import ComingSoon from './coming_soon'
import Menu from './menu'
import Ready from './ready'
import Game from './game'
import Trivia from './trivia'
import Admin from './admin'
import LeaderBoard from './leader_board'
import theme from '../theme'

const AppBase = styled.div`
  min-height: 100vh;

  @keyframes shrink {
    from { transform: scale(1.8) }
    to   { transform: none; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`

const Frame = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  overflow: scroll;

  @media (min-aspect-ratio: 9/16) {
    aspect-ratio: 9/16;
  }
`

const Logo = styled.img<{ $runAnimation: boolean }>`
  display: block;
  width: 45%;
  margin: 13% auto 5%;
  transform-origin: 50% 0;
  animation: shrink 0.2s 0.3s ease-out backwards;
  animation-play-state: ${props => props.$runAnimation ? 'running' : 'paused'}
`

const FadeInContainer = styled.div<{ $runAnimation: boolean }>`
  animation: fade-in 0.3s 0.3s ease-out backwards;
  animation-play-state: ${props => props.$runAnimation ? 'running' : 'paused'}
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
  position: fixed;
  top: 0;
  left: 0;
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
  const [registration, setRegistration] = React.useState<Record<string, any>>()
  const [loading, setLoading] = React.useState(true)
  const [logoLoaded, setLogoLoaded] = React.useState(false)
  const [ringLoaded, setRingLoaded] = React.useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false)
  const [lightsLoaded, setLightsLoaded] = React.useState(false)

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const snap = await getDoc(doc(getFirestore(), "users", user.uid));
        setRegistration(snap.data())
      }
      setLoading(false)
    })
  }, [])
  
  const allLoaded = [ logoLoaded, ringLoaded, backgroundLoaded, lightsLoaded ].every(b => b)
  if (window.location.pathname == '/admin') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Admin />
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBase>
        <GlobalStyle />
        <Frame>
          <Logo
            $runAnimation={allLoaded}
            onLoad={() => setLogoLoaded(true)}
            srcSet={`${logo} 1x, ${logo2x} 2x`}
          />
          { !loading &&
            <FadeInContainer $runAnimation={allLoaded}>
              { (() => {
                  if (!registration) {
                    return <RegistrationForm onSubmit={() => { setPage('ready'); setRegistration({}); }} />
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
          }
          <Spacer />
          <Terms href="#">Términos y Condiciones</Terms>
          <Ring
            onLoad={() => setRingLoaded(true)}
            srcSet={`${ring} 1x, ${ring2x} 2x`}
          />
          <Background
            onLoad={() => setBackgroundLoaded(true)}
            srcSet={`${background} 1x, ${background2x} 2x`}
          />
          <Lights
            onLoad={() => setLightsLoaded(true)}
            srcSet={`${lights} 1x, ${lights2x} 2x`}
          />
        </Frame>
      </AppBase>
    </ThemeProvider>
  )
}
