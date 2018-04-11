
const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(boardModel, colorsDecoder) {
    this.boardModel = boardModel;
    this.colorsDecoder = colorsDecoder;
  }

  getInitial() {
    return {
      boardColors: this.boardModel.createBoardColors(),
      boardKeyColors: [],
    };
  }

  muteBoardKeyColors(boardKeyColors, codeColors) {
    const correct = this.colorsDecoder.getCorrectPositions(codeColors);
    const wrong = this.colorsDecoder.getWrongPositions(codeColors);
    return this.boardModel.isLastColumn()
      ? [...boardKeyColors,
        [...new Array(correct).fill('Black'),
          ...new Array(wrong).fill('White'),
          ...new Array(this.colorsDecoder.colorsToGuess.length - correct - wrong).fill('lightgrey')]]
      : [...boardKeyColors];
  }

  muteState(color) {
    return (prevState) => {
      const { row, col } = this.boardModel.nextIndexes();

      const boardColors = [...prevState.boardColors];
      boardColors[row][col] = color;

      return {
        boardColors,
        boardKeyColors: this.muteBoardKeyColors(prevState.boardKeyColors, boardColors[row]),
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
