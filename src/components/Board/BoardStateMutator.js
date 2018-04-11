
const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(boardModel, colorsDecoder) {
    this.boardModel = boardModel;
    this.colorsDecoder = colorsDecoder;
  }

  getInitial() {
    return {
      boardColors: this.boardModel.createBoardColors(),
      positions: [],
    };
  }

  mutePositions(positions, codeColors) {
    return this.boardModel.isLastColumn()
      ? [...positions, {
        numberOfCorrectPositions: this.colorsDecoder.getCorrectPositions(codeColors),
        numberOfWrongPositions: this.colorsDecoder.getWrongPositions(codeColors),
      }]
      : [...positions];
  }

  muteState(color) {
    return (prevState) => {
      const { row, col } = this.boardModel.nextIndexes();

      const boardColors = [...prevState.boardColors];
      boardColors[row][col] = color;

      return {
        boardColors,
        positions: this.mutePositions(prevState.positions, boardColors[row]),
      };
    };
  }

  getNext(color) {
    if (this.boardModel.isLastMove()) {
      return identityState;
    }

    return this.muteState(color);
  }
}
