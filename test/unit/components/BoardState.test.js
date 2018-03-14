import BoardState from 'components/Board/BoardState';

describe('BoardState', () => {
  const state = new BoardState(2, 2);

  describe('isNextRow', () => {
    it('should return true when set to last item', () => {
      expect(state.isNextRow({ row: 1, item: 2 })).to.be.true;
    });

    it('should return false when set to first item', () => {
      expect(state.isNextRow({ row: 1, item: 1 })).to.be.false;
    });
  });

  describe('nextRow', () => {
    it('should return move state to next row, first item', () => {
      expect(BoardState.nextRow({ row: 1, item: 2 })).to.deep.equal({ row: 2, item: 1 });
    });
  });

  describe('nextItem', () => {
    it('should return move state to next item, same row', () => {
      expect(BoardState.nextItem({ row: 1, item: 1 })).to.deep.equal({ row: 1, item: 2 });
    });
  });

  describe('getInitial', () => {
    it('should return initial state', () => {
      expect(state.getInitial()).to.deep.equal({ row: 0, item: 0, boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] });
    });
  });

  describe('getNext', () => {
    it('should move from initial position to first item', () => {
      const prev = { row: 0, item: 0, boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = state.getNext('Green')(prev);

      expect(next).to.deep.equal({ row: 1, item: 1, boardColors: [['Green', 'lightgrey'], ['lightgrey', 'lightgrey']] });
    });

    it('should move to next item', () => {
      const prev = { row: 1, item: 1, boardColors: [['Green', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = state.getNext('Yellow')(prev);

      expect(next).to.deep.equal({ row: 1, item: 2, boardColors: [['Green', 'Yellow'], ['lightgrey', 'lightgrey']] });
    });

    it('should move last item to next row', () => {
      const prev = { row: 1, item: 2, boardColors: [['Green', 'Yellow'], ['lightgrey', 'lightgrey']] };

      const next = state.getNext('Red')(prev);

      expect(next).to.deep.equal({ row: 2, item: 1, boardColors: [['Green', 'Yellow'], ['Red', 'lightgrey']] });
    });
  });
});
