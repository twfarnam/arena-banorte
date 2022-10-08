import { observable, action, computed, makeObservable } from 'mobx';

import { Direction, MilliSeconds } from './Types';
import {
  tileFromScreen,
  screenFromTile,
  TileCoordinates,
  ScreenCoordinates,
  assertValidTileCoordinates,
} from './Coordinates';
import {
  makePacManStateChart,
  PacManEventType,
  INITIAL_PACMAN_STATE,
  PacManState,
} from './PacManStateChart';
import { Game } from './Game';
import { StateValue } from 'xstate';

export class PacMan {
  constructor(game: Game) {
    makeObservable(this, {
      handleTransition: action.bound,
      stateChartState: observable.ref,
      onChasing: action.bound,
      onDead: action.bound,
      dead: computed,
      state: computed,
      alive: computed,
      screenCoordinates: observable,
      setTileCoordinates: action,
      tileCoordinates: computed,
      diedAtTimestamp: observable,
      timeSinceDeath: computed,
      extraLivesLeft: observable,
      direction: observable
    });

    this.game = game;

    this.stateChart.onTransition(this.handleTransition);
    this.stateChart.start();
    this.stateChartState = this.stateChart.state;
  }

  handleTransition(state: PacManState) {
    if (!state.changed) {
      return;
    }
    this.stateChartState = state;
  }

  game: Game;

  stateChart = makePacManStateChart({
    onChasing: this.onChasing.bind(this),
    onDead: this.onDead.bind(this),
  });

  stateChartState: PacManState; // this.stateChart.state;

  onChasing() {
    this.game.energizerTimer.start();
  }

  onDead() {
    this.diedAtTimestamp = this.game.timestamp;
  }

  get dead(): boolean {
    return this.stateChartState.matches('dead');
  }

  get state(): StateValue {
    return this.stateChartState.value;
  }

  send(event: PacManEventType) {
    this.stateChart.send(event);
  }

  get alive() {
    return !this.dead;
  }

  screenCoordinates: ScreenCoordinates = screenFromTile({ x: 1, y: 1 });

  setTileCoordinates(tile: TileCoordinates) {
    assertValidTileCoordinates(tile);
    this.screenCoordinates = screenFromTile(tile);
  }

  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  diedAtTimestamp: MilliSeconds = -1;

  get timeSinceDeath(): MilliSeconds {
    if (this.alive) {
      return 0;
    }
    return this.game.timestamp - this.diedAtTimestamp;
  }

  extraLivesLeft = 2;

  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';
}

export const resetPacMan = (pacMan: PacMan) => {
  pacMan.diedAtTimestamp = -1;
  pacMan.stateChart.state.value = INITIAL_PACMAN_STATE;
  pacMan.setTileCoordinates({ x: 14, y: 23 });
  pacMan.nextDirection = 'LEFT';
  pacMan.direction = 'LEFT';
};
