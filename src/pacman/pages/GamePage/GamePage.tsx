import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Board } from '../../components/Board';
import { ExtraLives } from './components/ExtraLives';
import { GameOver } from './components/GameOver';
import { GhostsGameView } from './components/GhostsView';
import { MazeView } from './components/MazeView';
import { PacManView } from './components/PacManView';
import { PillsView } from './components/PillsView';
import { Score } from './components/Score';
import { useStore } from '../../components/StoreContext';
import { useKeyboardActions } from './components/useKeyboardActions';
import { VSpace } from '../../components/Spacer';
import { useGameLoop } from '../../model/useGameLoop';

export const GamePage: React.FC = observer(() => {
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
    <Layout data-testid="GamePage">
      <ScoreArea>
        <Row justify="center">
          <Score />
        </Row>
        <VSpace size="small" />
      </ScoreArea>

      <EmptyArea />

      <BoardArea>
        <Board>
          <MazeView />
          <PillsView />
          <PacManView />
          <GhostsGameView />
          <GameOver />
        </Board>
        <VSpace size="large" />
        <Row justify="center">
          <ExtraLives />
        </Row>
      </BoardArea>
    </Layout>
  );
});

const Layout = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`;

const ScoreArea = styled.div``;

const EmptyArea = styled.div``;

const BoardArea = styled.div``;

