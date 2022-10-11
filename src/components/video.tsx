import React from 'react'
import styled from 'styled-components'
import ExitButton from './exit_button'

const VideoBase = styled.div`
  text-align: center;
`

const Player = styled.video`
  display: block;
  width: 100%;
`

interface VideoProps {
  src: string
  onReturn: () => void
}

export default function Video({ src, onReturn }: VideoProps): React.ReactElement  {
  return (
    <VideoBase>
      <Player autoPlay controls src={src} />
      <ExitButton onReturn={onReturn} />
    </VideoBase>
  )
}

