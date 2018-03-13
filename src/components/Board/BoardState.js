
export default class BoardState {
  constructor(nbCodeHoles) {
    this.nbCodeHoles = nbCodeHoles;
  }

  isNextRow(prevState) {
    return prevState.item % this.nbCodeHoles === 0;
  }

  static nextRow(prevState) {
    return { row: prevState.row + 1, item: 1 };
  }

  static nextItem(prevState) {
    return { row: prevState.row, item: prevState.item + 1 };
  }

  getNext(color) {
    return (prevState) => {
      const boardColors = prevState.boardColors;

      const { row, item } = this.isNextRow(prevState)
        ? BoardState.nextRow(prevState)
        : BoardState.nextItem(prevState);
      boardColors[row - 1][item - 1] = color;

      return { row, item, boardColors };
    };
  }
}
