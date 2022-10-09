import React from 'react'
import styled from 'styled-components'
import starryBorder from '../assets/starry_border.svg'

const StarryBoxBase = styled.div`
  margin: 0 auto 40px;
  padding: 8px 4px;
  border: 12px solid currentColor;
  border-image-source: url(${starryBorder});
  border-image-slice: 20%;
  border-image-width: 10px;
  border-image-repeat: round;
`

const Top = styled.div`
  font-size: var(--top-font-size);
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 4px solid currentColor;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 6px;
    left: 0; 
    border-bottom: 4px solid currentColor;
  }
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  margin-top: 10px;
  text-align: justify;
  text-align-last: justify;
`

const Left = styled.div`
  width: 50%;
  padding-right: 10px;
  border-right: 1px solid currentColor;
`


const Right = styled.div`
  width: 50%;
  padding-left: 10px;
  text-align: justify;
  text-align-last: justify;
`

interface StarryBoxProps {
  className?: string
  top: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  bottom?: React.ReactNode
}

export default function StarryBox(
  { className, top, left, right, bottom }: StarryBoxProps
): React.ReactElement  {
  return (
    <StarryBoxBase className={className}>
      <Top>{top}</Top>
      { left && right &&
        <Row>
          <Left>{left}</Left>
          <Right>{right}</Right>
        </Row>
      }
      { bottom && <div>{ bottom }</div>}
    </StarryBoxBase>
  )
}
