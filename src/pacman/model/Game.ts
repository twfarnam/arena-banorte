import { action, computed, observable, makeObservable } from 'mobx';
import { Ghost } from './Ghost';
import { makeGhosts, resetGhosts } from './makeGhosts';
import { Maze } from './Maze';
import { PacMan, resetPacMan } from './PacMan';
import { MilliSeconds, PixelsPerFrame } from './Types';
import { Store } from './Store';
import { TimeoutTimer } from './TimeoutTimer';

export const DEFAULT_SPEED = 2;

const ENERGIZER_DURATION: MilliSeconds = 5000;

export class Game {
  constructor(store: Store) {
    makeObservable(this, {
      externalTimeStamp: observable,
      timestamp: observable,
      lastFrameLength: observable,
      frameCount: observable,
      gamePaused: observable,
      score: observable,
      killedGhosts: observable,
      revivePacMan: action.bound,
      gameOver: computed,
      handleEnergizerTimedOut: action
    });

    this.store = store;
    this.pacMan = new PacMan(this);
    this.ghosts = makeGhosts(this);
  }

  store: Store;

  //** The timestamp we got from requestAnimationFrame().
  externalTimeStamp: MilliSeconds | null = null;

  timestamp: MilliSeconds = 0;

  lastFrameLength: MilliSeconds = 17;

  frameCount = 0;

  gamePaused = false;

  speed: PixelsPerFrame = DEFAULT_SPEED;

  ghosts: Ghost[];

  pacMan: PacMan;

  score = 0;

  killedGhosts = 0;

  maze = new Maze();

  revivePacMan() {
    this.pacMan.send('REVIVED');
    this.timestamp = 0;
    resetPacMan(this.pacMan);
    resetGhosts(this.ghosts);
  }

  get gameOver(): boolean {
    const pacMan = this.pacMan;
    return pacMan.dead && pacMan.extraLivesLeft === 0;
  }

  energizerTimer = new TimeoutTimer(ENERGIZER_DURATION, () => {
    this.handleEnergizerTimedOut();
  });

  handleEnergizerTimedOut() {
    this.pacMan.send('ENERGIZER_TIMED_OUT');
    for (const ghost of this.ghosts) {
      ghost.send('ENERGIZER_TIMED_OUT');
    }
  }

  readyGameForPlay() {
    resetPacMan(this.pacMan);
  }
}
