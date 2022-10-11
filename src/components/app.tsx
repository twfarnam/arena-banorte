import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '../firebase'
import VideoOverlay from './video_overlay'
// @ts-ignore
import background from '../assets/background.png?w=1600&webp'
// @ts-ignore
import logo from '../assets/logo.png?w=400&webp'
// @ts-ignore
import logo2x from '../assets/logo.png?w=800&webp'
import GlobalStyle from './global_style'
import RegistrationForm from './registration_form'
import ComingSoon from './coming_soon'
import Menu from './menu'
import Ready from './ready'
import Game from './game'
import Terms from './terms'
import Video from './video'
import Trivia from './trivia'
import Admin from './admin'
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
  background: url("${background}");
  background-size: cover;

  @media (min-width: 700px) {
    aspect-ratio: 9/16;
    overflow: scroll;
  }
`

const Score = styled.div`
  text-align: center;
  font-size: 1.3rem;
  margin-top: 10px;
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

const Spacer = styled.div`
  flex-grow: 1;
`

const TermsLink = styled.div`
  display: block;
  width: fit-content;
  margin: 10px auto;
  cursor: pointer;
`

export type AppPage = 
  | 'ready'
  | 'menu'
  | 'trivia'
  | 'game'
  | 'leader-board'
  | 'video-one'
  | 'video-two'
  | 'prizes'
  | 'terms'
 
export default function App(): React.ReactElement {
  const [page, setPage] = React.useState<AppPage>('menu')
  const [registration, setRegistration] = React.useState<Record<string, any>>()
  const [videoDone, setVideoDone] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState(true)
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const snap = await getDoc(doc(getFirestore(), "users", user.uid));
        setRegistration(snap.data())
      }
      setLoading(false)
      // connectFunctionsEmulator(getFunctions(), "localhost", 5001);
      const result = await httpsCallable(getFunctions(), 'score')()
      // @ts-ignore
      setScore(result.data)
    })
  }, [])

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
          {!videoDone && <VideoOverlay onDone={() => setVideoDone(true)} />}
          {score > 0 && <Score>{score}</Score>}
          <Logo
            $runAnimation={videoDone}
            srcSet={`${logo} 1x, ${logo2x} 2x`}
          />
          { !loading &&
            <FadeInContainer $runAnimation={videoDone}>
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
                    return (
                      <Game
                        onPoints={points => setScore(score + points)}
                        onReturn={() => setPage('menu')}
                      />
                    )
                  } else if (page == 'trivia') {
                    return (
                      <Trivia
                        onPoints={points => setScore(score + points)}
                        onReturn={() => setPage('menu')}
                      />
                    )
                  } else if (page == 'video-one') {
                    return <Video src="/video-one.mp4" onReturn={() => setPage('menu')} />
                  } else if (page == 'video-two') {
                    return <Video src="/video-two.mp4" onReturn={() => setPage('menu')} />
                  } else if (page == 'terms') {
                    return <Terms onReturn={() => setPage('menu')} />
                  }
                })()
              }
            </FadeInContainer>
          }
          <Spacer />
          <TermsLink onClick={() => setPage('terms')}>Términos y Condiciones</TermsLink>
        </Frame>
      </AppBase>
    </ThemeProvider>
  )
}
