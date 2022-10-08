import React from 'react'
import styled from 'styled-components'

const StarryBoxBase = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 20px solid currentColor;
  border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='white' d='M53.3,92.5c-0.5,0.9-0.5,2.4-1.2,2.9c-0.6-2-1.3-4-2-5.9c-12.6-37.8-3-23.6-39.7-39.7 c42.2-18.1,25.5-3.3,41.9-45.9c0.6,2,1.3,4,2,5.9C66.8,47.6,57.5,33.5,94,49.5C56.3,66.3,66.9,52.1,53.3,92.5z'/%3E%3C/svg%3E%0A");
  border-image-slice: 1000;
  border-image-repeat: repeat;
`

const Top = styled.div`
  font-size: 4rem;
  border-bottom: 8px double currentColor;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  font-size: 1.2rem;
  text-align: justify;
  text-align-last: justify;
  margin-top: 10px;
`

const Left = styled.div`
  width: 50%;
  padding: 10px;
  border-right: 1px solid currentColor;
`


const Right = styled.div`
  width: 50%;
  padding: 10px;
`

interface StarryBoxProps {
  top: React.ReactNode
  left: React.ReactNode
  right: React.ReactNode
}

export default function StarryBox({ top, left, right }: StarryBoxProps): React.ReactElement  {
  return (
    <StarryBoxBase>
      <Top>{top}</Top>
      <Row>
        <Left>{left}</Left>
        <Right>{right}</Right>
      </Row>
    </StarryBoxBase>
  )
}
