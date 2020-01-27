
const defaultColors = (size) => new Array(size).fill('lightgrey');

export default class BoardModel {
  constructor(nbRows, nbHoles) {
    this.nbRows = nbRows;
    this.nbHoles = nbHoles;
    this.nbMove = 0;
  }

  createBoardColors() {
    return Array.from({ length: this.nbRows }, () => defaultColors(this.nbHoles));
  }

  isLastColumn() {
    return this.nbMove % this.nbHoles === 0;
  }

  isLastMove() {
    return this.nbMove === this.nbRows * this.nbHoles;
  }

  nextIndexes() {
    this.nbMove += 1;
    return {
      row: Math.floor((this.nbMove - 1) / this.nbHoles),
      col: (this.nbMove - 1) % this.nbHoles,
    };
  }
}
