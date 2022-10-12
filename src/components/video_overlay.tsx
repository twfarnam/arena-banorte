import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import playButton from '../assets/play.png?w=300&webp'

const VideoOverlayBase = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
`

const PlayButton = styled.img`
  width: 25%;
  position: absolute;
  inset: 0;
  margin: auto;
  cursor: pointer;
  z-index: 10000;
`

const Player = styled.video`
  display: block;
  width: 100%;
`

interface VideoOverlayProps {
  onDone: () => void
}

export default function VideoOverlay({ onDone }: VideoOverlayProps): React.ReactElement | null {
  const playerRef = React.useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = React.useState(false)

  React.useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.addEventListener('play', () => {
      setHasPlayed(true)
    })
    playerRef.current.addEventListener('ended', () => {
      if (playerRef.current?.src.endsWith('/video-one.mp4')) {
        playerRef.current!.currentTime = 0
        setTimeout(() => playerRef.current!.src = '/video-two.mp4')
      } else {
        onDone()
      }
    })
  }, [playerRef.current])
 
  function onClickClose() {
    onDone()
  }
  
  return (
    <VideoOverlayBase>
      <Close onClick={onClickClose}>&times;</Close>
      {!hasPlayed &&
        <PlayButton
          onClick={() => playerRef.current?.play()}
          src={playButton}
        />
      }
      <Player src="/video-one.mp4" ref={playerRef} autoPlay controls playsInline />
    </VideoOverlayBase>
  )
}
