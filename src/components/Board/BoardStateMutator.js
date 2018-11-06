
const identityState = prevState => prevState;

export default class BoardStateMutator {
  constructor(boardModel, colorsDecoder) {
    this.boardModel = boardModel;
    this.colorsDecoder = colorsDecoder;
  }

  getInitial() {
    return {
      boardCodeColors: this.boardModel.createBoardColors(),
      boardKeyColors: this.boardModel.createBoardColors(),
    };
  }

  mapKeyColors(codeColors) {
    const { correct, wrong, rest } = this.colorsDecoder.getNbPositions(codeColors);

    return [...new Array(correct).fill('Black'),
      ...new Array(wrong).fill('White'),
      ...new Array(rest).fill('lightgrey')];
  }

  muteState(color) {
    return (prevState) => {
      const { row, col } = this.boardModel.nextIndexes();

      const boardCodeColors = [...prevState.boardCodeColors];
      const lastRowCodeColors = boardCodeColors[row];
      lastRowCodeColors[col] = color;

      const boardKeyColors = [...prevState.boardKeyColors];
      let isDecoded = false;
      if (this.boardModel.isLastColumn()) {
        boardKeyColors[row] = this.mapKeyColors(lastRowCodeColors);
        isDecoded = this.colorsDecoder.isAllCorrect(lastRowCodeColors);
      }

      return { boardCodeColors, boardKeyColors, isDecoded };
    };
  }

  getNext(color) {
    if (this.boardModel.isLastMove()) {
      return identityState;
    }

    return this.muteState(color);
  }
}
