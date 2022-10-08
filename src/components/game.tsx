import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
// @ts-ignore
import game from '../assets/game.png?webp'
// @ts-ignore
import gameButton from '../assets/game_button.png?webp'
// @ts-ignore
import gameWelcome from '../assets/game_welcome.png?webp'
// @ts-ignore
import gameOver from '../assets/game_over.png?webp'
import Button from './button'
import { MinimalGame } from '../pacman/MinimalGame'
import { Store } from '../pacman/model/Store'
import { StoreProvider } from '../pacman/components/StoreContext'
import '../pacman/MinimalGlobalStyles.css';

const GameBase = styled.div`
  min-height: 60vh;
  background: rgba(0, 0, 0, 0.87);
  border: 5px solid #5F5290;
  border-radius: 20px;
  padding: 25% 20px 0;
  margin: 30px;
  position: relative;
  text-align: center;
`

const LeftIcon = styled.img`
  width: 40%;
  position: absolute;
  top: -8%;
  left: -10%;
`

const RightIcon = styled(LeftIcon)`
  left: initial;
  right: -10%;
  transform: scaleX(-1);
`

const GameMessage = styled.img`
  width: 80%;
  margin: 30px auto 80px;
`

const ExitButton = styled.div`
  margin: 200px 0 20px;
  font-size: 1.8rem;
  text-decoration: underline;
  cursor: pointer;
`

const GameContainer = styled.div`
  transform-origin: 0 0;
`

const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -90px;
`

const GameButton = styled.div`
  width: 20vw;
  aspect-ratio: 1;
  background: url(${gameButton});
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 50%;
  position: relative;

  @media (min-width: 800px) {
    width: 130px;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
  }

  @media (min-width: 800px) {
    width: 130px;
  }

`

const UpButton = styled(GameButton)`
  &::after {
    top: 35%;
    border-bottom-color: black;
    border-bottom-width: 20px;
  }
`

const LeftButton = styled(GameButton)`
  &::after {
    left: 35%;
    border-right-color: black;
    border-right-width: 20px;
  }
`

const RightButton = styled(GameButton)`
  &::after {
    left: 65%;
    border-left-color: black;
    border-left-width: 20px;
  }
`

const DownButton = styled(GameButton)`
  &::after {
    top: 65%;
    border-top-color: black;
    border-top-width: 20px;
  }
`

interface GameProps {
  onReturn: () => void
}

type GamePage = 'welcome' | 'playing' | 'over'

export default observer(function Game({ onReturn }: GameProps): React.ReactElement  {
  const [page, setPage] = React.useState<GamePage>('welcome')
  const store = React.useMemo(() => new Store(), [])
  const gameContainerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(resizeGame, [gameContainerRef.current])
  React.useEffect(() => {
    window.addEventListener('resize', resizeGame)
    return () => window.removeEventListener('resize', resizeGame)
  }, [])

  React.useEffect(() => {
    if (!store.game.gameOver) return
    console.log('game over')
    setTimeout(() => setPage('over'), 300)
  }, [store.game.gameOver])

  function resizeGame() {
    if (!gameContainerRef.current) return
    const scale = (
      gameContainerRef.current.clientWidth /
      gameContainerRef.current.children[0].clientWidth
    )
    const height = (
      (gameContainerRef.current.children[0].clientHeight + 60)
      * scale
    )
    gameContainerRef.current.style.transform = `scale(${scale})`
    gameContainerRef.current.style.height = height + 'px'
  }

  if (page == 'welcome') {
    return (
      <GameBase>
        <LeftIcon src={game} />
        <RightIcon src={game} />
        <GameMessage src={gameWelcome} />
        <Button onClick={() => { setPage('playing'); setTimeout(resizeGame); }}>
          Comenzar a jugar
        </Button>
      </GameBase>
    )
  } else if (page == 'over') {
    return (
      <GameBase>
        <LeftIcon src={game} />
        <RightIcon src={game} />
        <GameMessage src={gameOver} />
        <Button onClick={() => { setPage('playing'); store.resetGame(); }}>
          Volver a jugar
        </Button>
        <ExitButton onClick={onReturn}>Salir</ExitButton>
      </GameBase>
    )
  } else {
    return (
      <GameBase>
        <LeftIcon src={game} />
        <RightIcon src={game} />
        <GameContainer ref={gameContainerRef}>
          <StoreProvider value={store}>
            <MinimalGame />
          </StoreProvider>
        </GameContainer>
        <Controls>
          <LeftButton onClick={() => store.game.pacMan.nextDirection = 'LEFT'}/>
          <div>
            <UpButton onClick={() => store.game.pacMan.nextDirection = 'UP'}/>
            <DownButton onClick={() => store.game.pacMan.nextDirection = 'DOWN'}/>
          </div>
          <RightButton onClick={() => store.game.pacMan.nextDirection = 'RIGHT'}/>
        </Controls>
      </GameBase>
    )
  }
})
