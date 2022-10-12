import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { collection, addDoc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// @ts-ignore
import game from '../assets/game.png?webp'
// @ts-ignore
import gameButton from '../assets/game_button.png?webp'
import Button from './button'
import StarryBox from './starry_box'
import ExitButton from './exit_button'
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

const StyledStarryBox = styled(StarryBox)`
  max-width: 18rem;
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

const GameOverHeader = styled.div`
  display: block;
  width: 100%;
  font-size: 2em;
  text-align-last: center;
`

const GameOverPoints = styled.div`
  font-size: 1.5em;
`

interface GameProps {
  onPoints: (points: number) => void
  onReturn: () => void
}

type GamePage = 'welcome' | 'playing' | 'over'

export default observer(function Game({ onPoints, onReturn }: GameProps): React.ReactElement  {
  const [page, setPage] = React.useState<GamePage>('welcome')
  const [score, setScore] = React.useState<number>(0)
  const store = React.useMemo(() => new Store(), [])
  const gameContainerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(resizeGame, [gameContainerRef.current])
  React.useEffect(() => {
    window.addEventListener('resize', resizeGame)
    return () => window.removeEventListener('resize', resizeGame)
  }, [])

  React.useEffect(() => {
    if (!store.game.gameOver) return
    const didWin = store.game.maze.pills.every(row => row.every(p => p == 0))
    const points = didWin ? 50 : 0
    onPoints(points)
    setScore(score)
    addDoc(collection(getFirestore(), 'pacManScores'), {
      score,
      uid: getAuth().currentUser?.uid,
      createdAt: serverTimestamp(),
    }).catch(error => console.log(error))
    setTimeout(() => setPage('over'), 600)
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
        <StyledStarryBox
          top="Utiliza los controles para guiar tu pacman y comer la mayor cantidad de puntos."
          bottom="Cada victoria te otorgará 50 puntos. ¡Acumula los más posibles!"
        />
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
        <StyledStarryBox
          top={<GameOverHeader>Obtuviste:</GameOverHeader>}
          left={<GameOverPoints>{score} puntos</GameOverPoints>}
          right="Mientras más juegues, más posibilidades tienes de ganar."
        />
        <Button onClick={() => { setPage('playing'); store.resetGame(); }}>
          Volver a jugar
        </Button>
        <ExitButton onReturn={onReturn} />
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
        <ExitButton onReturn={onReturn} />
      </GameBase>
    )
  }
})
