import React from 'react'
import styled from 'styled-components'
import { AppPage } from './app'
// @ts-ignore
import questionMarks from '../assets/question-marks.png?webp'
// @ts-ignore
import game from '../assets/game.png?webp'
// @ts-ignore
import star from '../assets/star.svg'

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

export default function Menu({ onSetPage }: MenuProps): React.ReactElement  {
  return (
    <MenuBase>
      <Row>
        <Option onClick={() => onSetPage('trivia')}>
          <Icon src={questionMarks} />
          <Circle />
          <Title>Trivia</Title>
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
