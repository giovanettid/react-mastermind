
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles, colorsToGuess) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.colorsToGuess = colorsToGuess;
    this.nbMove = 0;
  }

  isLastColumn() {
    return this.nbMove % this.nbCodeHoles === 0;
  }

  isLastMove() {
    return this.nbMove === this.nbRows * this.nbCodeHoles;
  }

  getIndexes() {
    return {
      row: Math.floor((this.nbMove - 1) / this.nbCodeHoles),
      col: (this.nbMove - 1) % this.nbCodeHoles,
    };
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

  mutePositions(positions, codeColors) {
    return this.isLastColumn()
      ? [...positions, {
        numberOfCorrectPositions: this.getCorrectPositions(codeColors),
        numberOfWrongPositions: this.getWrongPositions(codeColors),
      }]
      : [...positions];
  }

  muteState(color) {
    return (prevState) => {
      const { row, col } = this.getIndexes();

      const boardColors = [...prevState.boardColors];
      boardColors[row][col] = color;

      return {
        boardColors,
        positions: this.mutePositions(prevState.positions, boardColors[row]),
      };
    };
  }

  getNext(color) {
    if (this.isLastMove()) {
      return identityState;
    }

    this.nbMove = this.nbMove + 1;

    return this.muteState(color);
  }
}
