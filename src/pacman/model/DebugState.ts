import { observable, makeObservable } from 'mobx';
import { Store } from './Store';
import { GhostViewOptions } from './GhostViewOptions';
import { PacManViewOptions } from '../pages/GamePage/components/PacManViewOptions';
import { GameViewOptions } from './GameViewOptions';

export class DebugState {
  constructor(store: Store) {
    makeObservable(this, {
      gameViewOptions: observable,
      ghostViewOptions: observable,
      pacManViewOptions: observable
    });

    this.store = store;
  }

  store: Store;

  gameViewOptions: GameViewOptions = {
    hitBox: false,
  };

  ghostViewOptions: GhostViewOptions = {
    target: false,
    wayPoints: false,
  };

  pacManViewOptions: PacManViewOptions = {
    somePlaceholder: false,
  };
}
