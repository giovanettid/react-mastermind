import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('BoardStateMutator', () => {
  const mutator = new BoardStateMutator(2, 2);

  describe('isPreviousRow', () => {
    it('should return true when set to last item', () => {
      expect(mutator.isPreviousRow(2)).to.be.true;
    });

    it('should return false when set to first item', () => {
      expect(mutator.isPreviousRow(1)).to.be.false;
    });
  });

  describe('previousRow', () => {
    it('should move state to previous row, first item', () => {
      expect(BoardStateMutator.previousRow({ row: 2, item: 2 })).to.deep.equal({ row: 1, item: 1 });
    });
  });

  describe('nextItem', () => {
    it('should move state to next item, same row', () => {
      expect(mutator.nextItem({ row: 1, item: 1 })).to.deep.equal({ row: 1, item: 2 });
    });
  });

  describe('getInitial', () => {
    it('should return initial state', () => {
      expect(mutator.getInitial()).to.deep.equal({ boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] });
    });
  });

  describe('getNext', () => {
    it('should move from undefined position to first position', () => {
      const prev = { boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal({ row: 2, item: 1, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] });
    });

    it('should move to next item', () => {
      const prev = { row: 2, item: 1, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next).to.deep.equal({ row: 2, item: 2, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'Yellow']] });
    });

    it('should move from last item to previous row', () => {
      const prev = { row: 2, item: 2, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Red')(prev);

      expect(next).to.deep.equal({ row: 1, item: 1, boardColors: [['Red', 'lightgrey'], ['Green', 'Yellow']] });
    });
  });
});
