import React from 'react'
import styled from 'styled-components'
import { intervalToDuration, formatDuration } from 'date-fns'
import locale from 'date-fns/locale/es'
import { AppPage } from './app'
import triviaData  from '../trivia_data'
// @ts-ignore
import questionMarks from '../assets/question-marks.png?webp'
// @ts-ignore
import game from '../assets/game.png?webp'
// @ts-ignore
import star from '../assets/star.svg'
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

const LeaderBoardOption = styled.div`
  position: relative;
  margin: 0 auto;
  cursor: pointer;
`

const WhiteCircle = styled(Circle)`
  width: 20%;
  position: relative;
  background: white;
  margin: 0 auto;
`

const StarIcon = styled.img`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
`

const LeaderBoardTitle = styled.div`
  font-size: 1.3rem;
  margin-top: 10px;
  white-space: nowrap;
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

export default function Menu({ onSetPage }: MenuProps): React.ReactElement  {
  const forceUpdate = useForceUpdate()
  const tenMinutes = 10 * 60 * 1000
  const triviaOpen = triviaData.find(
    q => (
      q.startAt.getTime() < getTime() + 1000 &&
      getTime() - q.startAt.getTime() < tenMinutes
    )
  )
  const nextTrivia = triviaData.find(
    q => q.startAt.getTime() > getTime()
  )

  React.useEffect(() => {
    const timer = setInterval(forceUpdate, 500)
    return () => clearInterval(timer)
  })

  return (
    <MenuBase>
      <Row>
        <Option onClick={() => triviaOpen && onSetPage('trivia')}>
          <Icon src={questionMarks} />
          <Circle />
          { triviaOpen
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
      <LeaderBoardOption onClick={() => onSetPage('leader-board')}>
        <WhiteCircle>
          <StarIcon src={star} />
        </WhiteCircle>
        <LeaderBoardTitle>Tabla de posiciones</LeaderBoardTitle>
      </LeaderBoardOption>
    </MenuBase>
  )
}
