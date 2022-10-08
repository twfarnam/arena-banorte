import { observable, action, makeObservable } from 'mobx';
import { Game } from './Game';
import { DebugState } from './DebugState';

export class Store {
  game: Game = new Game(this);

  debugState = new DebugState(this);

  constructor() {
    makeObservable(this, {
      game: observable,
      resetGame: action.bound
    });
  }

  resetGame() {
    this.game = new Game(this);
    this.game.readyGameForPlay();
  }
}
