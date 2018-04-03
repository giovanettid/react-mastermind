
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles, colorsToGuess) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.colorsToGuess = colorsToGuess;
  }

  isFirstMove() {
    return this.row === undefined && this.item === undefined;
  }

  isLastItem() {
    return this.item === this.nbCodeHoles - 1;
  }

  isLastMove() {
    return this.row === this.nbRows - 1 && this.isLastItem();
  }

  moveFirst() {
    this.row = 0;
    this.item = 0;
  }

  nextRow() {
    this.row = this.row + 1;
    this.item = 0;
  }

  nextItem() {
    this.item = this.item + 1;
  }

  move() {
    if (this.isFirstMove()) {
      this.moveFirst();
    } else if (this.isLastItem()) {
      this.nextRow();
    } else {
      this.nextItem();
    }
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

  muteState(color) {
    return (prevState) => {
      const { boardColors, positions } = prevState;

      boardColors[this.row][this.item] = color;

      if (this.isLastItem()) {
        positions.push(this.getPositions(boardColors[this.row]));
      }

      return { positions, boardColors };
    };
  }

  getNext(color) {
    if (this.isLastMove()) {
      return identityState;
    }

    this.move();

    return this.muteState(color);
  }
}
