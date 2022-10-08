import { MilliSeconds } from './Types';
import { observable, computed, action, makeObservable } from 'mobx';

export type TimerCallback = () => void;

export class TimeoutTimer {
  duration: MilliSeconds;
  readonly onTimedOut: TimerCallback | null;

  running: boolean;

  timeSpent: MilliSeconds;

  constructor(duration: MilliSeconds, onTimedOut: TimerCallback | null = null) {
    makeObservable(this, {
      running: observable,
      timeSpent: observable,
      setDuration: action,
      start: action.bound,
      advance: action,
      stop: action,
      timeLeft: computed,
      isTimedOut: computed
    });

    this.duration = duration;
    this.onTimedOut = onTimedOut;
    this.running = false;
    this.timeSpent = 0;
  }

  setDuration(duration: MilliSeconds) {
    this.duration = duration;
  }

  start() {
    this.running = true;
    this.timeSpent = 0;
  }

  advance(timePassed: MilliSeconds) {
    if (!this.running) {
      return;
    }
    this.timeSpent += timePassed;
    if (this.isTimedOut) {
      this.onTimedOut?.();
      this.stop();
    }
  }

  stop() {
    this.running = false;
  }

  restart() {
    this.stop();
    this.start();
  }

  get timeLeft() {
    return this.duration - this.timeSpent;
  }

  get isTimedOut() {
    return this.timeSpent >= this.duration;
  }
}
