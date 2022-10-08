import { observable, makeObservable } from 'mobx';
import { getPillsMatrix, TileId } from './MazeData';

export class Maze {
  pills: TileId[][] = getPillsMatrix();

  constructor() {
    makeObservable(this, {
      pills: observable
    });
  }
}
