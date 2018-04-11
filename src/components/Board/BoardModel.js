
const defaultColors = size => new Array(size).fill('lightgrey');

export default class BoardModel {
  constructor(nbRows, nbCodeHoles) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.nbMove = 0;
  }

  createBoardColors() {
    return Array.from({ length: this.nbRows }, () => defaultColors(this.nbCodeHoles));
  }

  isLastColumn() {
    return this.nbMove % this.nbCodeHoles === 0;
  }

  isLastMove() {
    return this.nbMove === this.nbRows * this.nbCodeHoles;
  }

  nextIndexes() {
    this.nbMove = this.nbMove + 1;
    return {
      row: Math.floor((this.nbMove - 1) / this.nbCodeHoles),
      col: (this.nbMove - 1) % this.nbCodeHoles,
    };
  }
}
