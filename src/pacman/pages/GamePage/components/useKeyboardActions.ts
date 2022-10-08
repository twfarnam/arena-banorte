import { useCallback, useEffect } from 'react';
import { useStore } from '../../../components/StoreContext';

/* eslint-disable  react-hooks/exhaustive-deps */
export const useKeyboardActions = (): void => {
  const store = useStore();

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    const { game } = store;
    const pressedKey = event.key;
    const pacMan = game.pacMan;
    switch (pressedKey) {
      case 'ArrowLeft':
        event.preventDefault()
        pacMan.nextDirection = 'LEFT';
        break;
      case 'ArrowRight':
        event.preventDefault()
        pacMan.nextDirection = 'RIGHT';
        break;
      case 'ArrowUp':
        event.preventDefault()
        pacMan.nextDirection = 'UP';
        break;
      case 'ArrowDown':
        event.preventDefault()
        pacMan.nextDirection = 'DOWN';
        break;
      case ' ':
        event.preventDefault()
        game.gamePaused = !game.gamePaused;
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
};
