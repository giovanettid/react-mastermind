
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles, colorsToGuess) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.colorsToGuess = colorsToGuess;
    this.row = this.nbRows;
    this.item = 0;
  }

  isLastItem() {
    return this.item === this.nbCodeHoles;
  }

  isLastMove() {
    return this.row === 1 && this.item === this.nbCodeHoles;
  }

  previousRow() {
    this.row = this.row - 1;
    this.item = 1;
  }

  nextItem() {
    this.item = this.item + 1;
  }

  getInitial() {
    return {
      boardColors: createBoardColors(this.nbRows, this.nbCodeHoles),
      positions: [],
    };
  }

  getCorrectPositions(colors) {
    return colors.filter((color, i) => color === this.colorsToGuess[i]).length;
  }

  getWrongPositions(colors) {
    return colors.filter((color, i) => {
      const index = this.colorsToGuess.indexOf(color);
      return index !== -1 && index !== i;
    }).length;
  }

  getPositions(codeColors) {
    return {
      numberOfCorrectPositions: this.getCorrectPositions(codeColors),
      numberOfWrongPositions: this.getWrongPositions(codeColors),
    };
  }

  getNext(color) {
    return (prevState) => {
      if (this.isLastMove()) {
        return prevState;
      }

      if (this.isLastItem()) {
        this.previousRow();
      } else {
        this.nextItem();
      }

      const { boardColors, positions } = prevState;

      boardColors[this.row - 1][this.item - 1] = color;

      if (this.isLastItem()) {
        positions.push(this.getPositions(boardColors[this.row - 1]));
      }

      return { positions, boardColors };
    };
  }
}
