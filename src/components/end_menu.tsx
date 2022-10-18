import React from 'react'
import styled from 'styled-components'
import WinnersModal from './winners_modal'
// @ts-ignore
import camera from '../assets/camera.png?webp'
// @ts-ignore
import threeSixty from '../assets/three_sixty.png?webp'

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
  text-decoration: none;
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

export default function EndMenu(): React.ReactElement  {
  return (
    <MenuBase>
      <Row>
        <Option as="a" href="https://gallery.revospin.com/#/d/fYIA3lxev2" target="_blank">
          <Container>
            <Icon src={threeSixty} />
            <Circle />
          </Container>
          <Title>Cámara 360º</Title>
        </Option>
        <Option as="a" href="https://drive.google.com/drive/folders/1tebp33htilyE9D0TYLQvhcHCoU8-xQmi?usp=sharing" target="_blank">
          <Icon src={camera} />
          <Circle />
          <Title>Green Screen</Title>
        </Option>
      </Row>
      <div>
        <WinnersModal />
      </div>
    </MenuBase>
  )
}
