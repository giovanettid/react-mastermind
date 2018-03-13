import BoardState from 'components/Board/BoardState';

describe('BoardState', () => {
  const state = new BoardState(2);

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
