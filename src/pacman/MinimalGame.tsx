import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Board } from './components/Board';
import { ExtraLives } from './pages/GamePage/components/ExtraLives';
import { GameOver } from './pages/GamePage/components/GameOver';
import { GhostsGameView } from './pages/GamePage/components/GhostsView';
import { MazeView } from './pages/GamePage/components/MazeView';
import { PacManView } from './pages/GamePage/components/PacManView';
import { PillsView } from './pages/GamePage/components/PillsView';
import { useStore } from './components/StoreContext';
import { useKeyboardActions } from './pages/GamePage/components/useKeyboardActions';
import { VSpace } from './components/Spacer';
import { useGameLoop } from './model/useGameLoop';

export const MinimalGame: React.FC = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.resetGame();
    return () => {
      store.game.gamePaused = true;
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  useGameLoop();
  useKeyboardActions();

  return (
    <>
      <Board>
        <MazeView />
        <PillsView />
        <PacManView />
        <GhostsGameView />
        <GameOver />
      </Board>
      <VSpace size="large" />
      <ExtraLives />
    </>
  );
});
