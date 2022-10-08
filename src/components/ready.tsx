import React from 'react'
import styled from 'styled-components'
import Button from './button'

const ComingSoonBase = styled.div`
  text-align: center;
  width: 80%;
  margin: 20px auto;
`

interface ReadyProps {
  onPlay: () => void
}

export default function Ready({ onPlay }: ReadyProps): React.ReactElement  {
  return (
    <ComingSoonBase>
      <h1>¡Todo listo!</h1>
      <Button onClick={onPlay}>Comenzar a jugar</Button>
    </ComingSoonBase>
  )
}

