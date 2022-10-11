import React from 'react'
import ExitButton from './exit_button'
import styled from 'styled-components'

const PrizesBase = styled.div`
  text-align: center;
`

interface PrizesProps {
  onReturn: () => void
}

export default function Prizes({ onReturn }: PrizesProps): React.ReactElement  {
  return (
    <PrizesBase>
      <h1>Premios</h1>
      <ExitButton onReturn={onReturn} />
    </PrizesBase>
  )
}

