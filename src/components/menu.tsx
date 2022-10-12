import React from 'react'
import styled from 'styled-components'
import { intervalToDuration, formatDuration } from 'date-fns'
import locale from 'date-fns/locale/es'
import lottie from 'lottie-web'
import { AppPage } from './app'
import triviaData  from '../trivia_data'
import PrizesModal from './prizes_modal'
// @ts-ignore
import questionMarks from '../assets/question-marks.png?webp'
// @ts-ignore
import game from '../assets/game.png?webp'
import useForceUpdate from '../hooks/use_force_update'

const MenuBase = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding-top: 5%;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
`

const Option = styled.div`
  width: 40%;
  position: relative;
  cursor: pointer;
`

const Container = styled.div<{$isDisabled?: boolean}>`
  ${props => props.$isDisabled ? 'opacity: 0.5;' : ''}
`

const Title = styled.div`
  font-size: 1.6rem;
  margin-top: 10px;
`

const Icon = styled.img`
  position: absolute;
  width: 130%;
  left: -15%;
  top: -20%;
`

const Circle = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #020954;
  border: 5px solid #5F5290;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const WhiteCircle = styled(Circle)`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  background: white;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

interface MenuProps {
  onSetPage: (page: AppPage) => void
}

function getTime(): number {
  const params = new URLSearchParams(location.search)
  return !params.get('date')
    ? Date.now()
    : (
        new Date(params.get('date')!).getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        parseFloat(params.get('hour') || '0') * 60 * 60 * 1000 +
        parseFloat(params.get('minute') || '0') * 60 * 1000 +
        parseFloat(params.get('second') || '0') * 1000 +
        Math.round(performance.now())
      )
}

export function getOpenTriviaIndex(): number {
  const tenMinutes = 10 * 60 * 1000
  return triviaData.findIndex(
    q => (
      q.startAt.getTime() < getTime() + 1000 &&
      getTime() - q.startAt.getTime() < tenMinutes
    )
  )
}

export default function Menu({ onSetPage }: MenuProps): React.ReactElement  {
  const leaderBoardAnimationRef = React.useRef<HTMLDivElement>(null)
  const videoOneAnimationRef = React.useRef<HTMLDivElement>(null)
  const videoTwoAnimationRef = React.useRef<HTMLDivElement>(null)
  const forceUpdate = useForceUpdate()
  const triviaOpenIndex = getOpenTriviaIndex()
  const triviaIsOpen = triviaOpenIndex != -1
  const nextTrivia = triviaData.find(
    q => q.startAt.getTime() > getTime()
  )

  React.useEffect(() => {
    if (!leaderBoardAnimationRef.current) return
    if (leaderBoardAnimationRef.current.children.length) return
    lottie.loadAnimation({
      container: leaderBoardAnimationRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'leaderboard.json',
    })
  }, [leaderBoardAnimationRef.current])

  React.useEffect(() => {
    if (!videoOneAnimationRef.current) return
    if (videoOneAnimationRef.current.children.length) return
    lottie.loadAnimation({
      container: videoOneAnimationRef.current,
      loop: true,
      autoplay: true,
      path: 'video1.json',
    })
  }, [videoOneAnimationRef.current])

  React.useEffect(() => {
    if (!videoTwoAnimationRef.current) return
    if (videoTwoAnimationRef.current.children.length) return
    lottie.loadAnimation({
      container: videoTwoAnimationRef.current,
      loop: true,
      autoplay: true,
      path: 'video2.json',
    })
  }, [videoTwoAnimationRef.current])

  React.useEffect(() => {
    const timer = setInterval(forceUpdate, 500)
    return () => clearInterval(timer)
  })
 
  const triviaCompleted = 'triviaCompleted' in localStorage
    ? JSON.parse(localStorage.triviaCompleted)
    : []
  const openTriviaIsCompleted = triviaCompleted.includes(triviaOpenIndex)
  return (
    <MenuBase>
      <Row>
        <Option onClick={triviaIsOpen && !openTriviaIsCompleted ? () => onSetPage('trivia') : undefined}>
          <Container $isDisabled={!triviaIsOpen || openTriviaIsCompleted}>
            <Icon src={questionMarks} />
            <Circle />
          </Container>
          { openTriviaIsCompleted 
            ? <Title>Trivia {triviaOpenIndex + 1} ya hecha</Title>
            : triviaIsOpen
            ? <Title>
                Trivia abierta
                <br />
                ¡Juega ahora!
              </Title>
            : nextTrivia
            ? <Title>
                Siguiente trivia en:{' '}
                { formatDuration(
                    intervalToDuration({ start: getTime(), end: nextTrivia.startAt }),
                    { locale }
                  )
                }
              </Title>
            : <Title>
                La ultimá tivia ya se terminó
              </Title>
          }
        </Option>
        <Option onClick={() => onSetPage('game')}>
          <Icon src={game} />
          <Circle />
          <Title>¡Juega y acumula puntos aquí!</Title>
        </Option>
      </Row>
      <div>
        <PrizesModal />
      </div>
      <h2>Conoce más de:</h2>
      <Row>
        <Option onClick={() => onSetPage('video-one')}>
          <WhiteCircle>
            <div ref={videoOneAnimationRef} />
          </WhiteCircle>
          <Title>Crédito hipotecario</Title>
        </Option>
        <Option onClick={() => onSetPage('video-two')}>
          <WhiteCircle>
            <div ref={videoTwoAnimationRef} />
          </WhiteCircle>
          <Title>Seguros Banorte</Title>
        </Option>
      </Row>
    </MenuBase>
  )
}
