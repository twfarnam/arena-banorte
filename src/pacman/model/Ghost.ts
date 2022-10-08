import { action, computed, observable, makeObservable } from 'mobx';
import { changeDirectionToOpposite } from './changeDirectionToOpposite';
import {
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
} from './Coordinates';
import { findWayPoints } from './findWayPoints';
import { Game } from './Game';
import {
  GhostEventType,
  makeGhostStateChart,
  GhostState,
} from './GhostStateChart';
import { Direction, MilliSeconds } from './Types';
import {
  isTileInBox as isTileInBoxWalls,
  isTileCenter,
  isTileInBoxSpace,
} from './Ways';
import { StateValue } from 'xstate';
import { TimeoutTimer } from './TimeoutTimer';
import { getStatePhaseLength } from './updateGhostStatePhase';

export type GhostNumber = 0 | 1 | 2 | 3;
export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export type GhostAnimationPhase = 0 | 1;
export const GhostAnimationPhases: GhostAnimationPhase[] = [0, 1];
export type FrightenedGhostTime = 0 | 1;
export const FrightenedGhostTimes: FrightenedGhostTime[] = [0, 1];

const FRIGHTENED_ABOUT_TO_END_DURATION: MilliSeconds = 3000;
const DEAD_WAITING_IN_BOX_DURATION: MilliSeconds = 3000;

export const KILL_GHOST_SCORE = [0, 100, 200, 400, 800, 1600, 3200];

export class Ghost {
  constructor(game: Game) {
    makeObservable(this, {
      handleStateTransition: action.bound,
      onDead: action.bound,
      onScatterToChase: action.bound,
      onChaseToScatter: action.bound,
      stateChartState: observable.ref,
      state: computed,
      stateChanges: observable,
      dead: computed,
      alive: computed,
      frightened: computed,
      ghostPaused: observable,
      ghostNumber: observable,
      screenCoordinates: observable,
      atTileCenter: computed,
      speedFactor: observable,
      setTileCoordinates: action,
      tileCoordinates: computed,
      animationPhase: computed,
      frightenedAboutToEnd: computed,
      deadWaitingTimeInBoxLeft: observable,
      frightenedGhostTime: computed,
      direction: observable,
      targetTile: observable,
      wayPoints: computed,
      isInsideBoxWalls: computed,
      isOutsideBoxSpace: computed,
      canPassThroughBoxDoor: computed,
      resetGhost: action
    });

    this.game = game;

    this.stateChart.onTransition(this.handleStateTransition);
    this.stateChart.start();
    this.stateChartState = this.stateChart.state
    this.screenCoordinates = { x: 16, y: 16 }
  }

  handleStateTransition(state: GhostState) {
    if (!state.changed) {
      return;
    }
    this.stateChartState = state;
    this.stateChanges++;
  }

  stateChart = makeGhostStateChart({
    onScatterToChase: this.onScatterToChase.bind(this),
    onChaseToScatter: this.onChaseToScatter.bind(this),
    onDead: this.onDead.bind(this),
  });

  onDead() {
    this.game.killedGhosts++;
    this.game.score += KILL_GHOST_SCORE[this.game.killedGhosts];
    this.deadWaitingTimeInBoxLeft = DEAD_WAITING_IN_BOX_DURATION;
  }

  onScatterToChase() {
    changeDirectionToOpposite(this);
  }

  onChaseToScatter() {
    changeDirectionToOpposite(this);
  }

  stateChartState: GhostState;

  get state(): StateValue {
    return this.stateChartState.value;
  }

  stateChanges = 0;

  get dead() {
    return this.stateChartState.matches('dead');
  }

  get alive() {
    return !this.dead;
  }

  get frightened(): boolean {
    return this.stateChartState.matches('frightened');
  }

  name = 'ghost name';

  send(event: GhostEventType) {
    this.stateChart.send(event);
  }

  ghostPaused = true;

  game: Game;

  ghostNumber: GhostNumber = 0;

  color = 'ghost color';
  colorCode = '#00ffff';

  screenCoordinates: ScreenCoordinates = {
    x: 16,
    y: 16,
  };

  get atTileCenter(): boolean {
    return isTileCenter(this.screenCoordinates);
  }

  speedFactor = 1;

  setTileCoordinates(tile: TileCoordinates) {
    this.screenCoordinates = screenFromTile(tile);
  }

  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  get animationPhase(): GhostAnimationPhase {
    return Math.round((this.game.timestamp + this.ghostNumber * 100) / 300) %
      2 ===
      0
      ? 0
      : 1;
  }

  get frightenedAboutToEnd(): boolean {
    return this.game.energizerTimer.timeLeft < FRIGHTENED_ABOUT_TO_END_DURATION;
  }

  deadWaitingTimeInBoxLeft: MilliSeconds = 0;

  get frightenedGhostTime(): FrightenedGhostTime {
    if (!this.frightenedAboutToEnd) {
      return 0;
    }
    // Blink every 0.5 seconds
    return this.game.timestamp % 1000 < 500 ? 0 : 1;
  }

  direction: Direction = 'LEFT';

  targetTile: TileCoordinates = { x: 1, y: 1 };

  get wayPoints(): TileCoordinates[] | null {
    return findWayPoints(
      this.tileCoordinates,
      this.targetTile,
      this.direction,
      this.canPassThroughBoxDoor
    );
  }

  statePhaseTimer = new TimeoutTimer(3000);

  get isInsideBoxWalls(): boolean {
    return isTileInBoxWalls(this.tileCoordinates);
  }

  get isOutsideBoxSpace() {
    return !isTileInBoxSpace(this.tileCoordinates);
  }

  get canPassThroughBoxDoor(): boolean {
    if (this.alive) {
      if (this.isInsideBoxWalls) {
        if (this.game.timestamp > this.initialWaitingTimeInBox) {
          return true;
        }
      }
    }

    if (this.dead) {
      if (this.isOutsideBoxSpace) {
        return true;
      }

      // Dead && Inside box
      if (this.deadWaitingTimeInBoxLeft <= 0) {
        return true;
      }
    }

    return false;
  }

  resetGhost() {
    this.ghostPaused = false;
    this.send('RESET');
    this.statePhaseTimer.setDuration(getStatePhaseLength(this.state));
    this.statePhaseTimer.restart();
  }

  initialWaitingTimeInBox = 0;
}
