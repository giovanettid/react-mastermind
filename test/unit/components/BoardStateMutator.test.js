import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('BoardStateMutator', () => {
  const mutator = new BoardStateMutator(2, 2, ['Red', 'Blue']);

  describe('isPreviousRow', () => {
    it('should return true when set to last item', () => {
      expect(mutator.isPreviousRow(2)).to.be.true;
    });

    it('should return false when set to first item', () => {
      expect(mutator.isPreviousRow(1)).to.be.false;
    });
  });

  describe('isLastMove', () => {
    it('should return true when position is first row and last item', () => {
      expect(mutator.isLastMove({ row: 1, item: 2 })).to.be.true;
    });

    it('should return false when position is last row', () => {
      expect(mutator.isLastMove({ row: 2, item: 2 })).to.be.false;
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
    it('should return initial boardColors', () => {
      expect(mutator.getInitial().boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']]);
    });

    it('should return empty initial positions', () => {
      expect(mutator.getInitial().positions).to.deep.equal([]);
    });
  });

  describe('getNext', () => {
    it('should move from undefined position to first position', () => {
      const prev = { boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = mutator.getNext('Green')(prev);

      expect(next.row).to.equal(2);
      expect(next.item).to.equal(1);
      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'lightgrey']]);
    });

    it('should move to next item', () => {
      const prev = { positions: [], row: 2, item: 1, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.row).to.equal(2);
      expect(next.item).to.equal(2);
      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should move from last item to previous row', () => {
      const prev = { row: 2, item: 2, boardColors: [['lightgrey', 'lightgrey'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Red')(prev);

      expect(next.row).to.equal(1);
      expect(next.item).to.equal(1);
      expect(next.boardColors).to.deep.equal([['Red', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not move when position is first row and last item', () => {
      const prev = { row: 1, item: 2, boardColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update position when choose correct position', () => {
      const positions = { positions: [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }] };
      const prev = { row: 2, item: 1, boardColors: [['lightgrey', 'lightgrey'], ['Red', 'lightgrey']] };

      const next = mutator.getNext('Blue')(Object.assign(prev, positions));

      expect(next.positions).to.deep.equal([
        { numberOfCorrectPositions: 1, numberOfWrongPositions: 0 },
        { numberOfCorrectPositions: 2, numberOfWrongPositions: 0 },
      ]);
    });
  });

  describe('getPositions', () => {
    const threeCodeMutator = new BoardStateMutator(1, 3, ['Red', 'Blue', 'Yellow']);

    describe('when 1 correct color but wrong position', () => {
      it('should return 1 wrong position & 0 correct position', () => {
        expect(threeCodeMutator.getPositions(['Green', 'Red', 'Black'])).to.deep.equal({
          numberOfCorrectPositions: 0,
          numberOfWrongPositions: 1,
        });
      });
    });

    describe('when 1 correct color and position', () => {
      it('should return 1 correct position & 0 wrong position', () => {
        expect(threeCodeMutator.getPositions(['Red', 'Green', 'Black'])).to.deep.equal({
          numberOfCorrectPositions: 1,
          numberOfWrongPositions: 0,
        });
      });
    });

    describe('when 1 correct color and position & 1 correct color but wrong position', () => {
      it('should return 1 correct position & 1 wrong position', () => {
        expect(threeCodeMutator.getPositions(['Red', 'Green', 'Blue'])).to.deep.equal({
          numberOfCorrectPositions: 1,
          numberOfWrongPositions: 1,
        });
      });
    });
  });
});
