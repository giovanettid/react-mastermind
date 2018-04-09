
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles, colorsDecoder) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.colorsDecoder = colorsDecoder;
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

  mutePositions(positions, codeColors) {
    return this.isLastColumn()
      ? [...positions, {
        numberOfCorrectPositions: this.colorsDecoder.getCorrectPositions(codeColors),
        numberOfWrongPositions: this.colorsDecoder.getWrongPositions(codeColors),
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
