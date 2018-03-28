import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('BoardStateMutator', () => {
  const mutator = new BoardStateMutator(2, 2, ['Red', 'Blue']);

  describe('isLastItem', () => {
    it('should return true when set to last item', () => {
      expect(mutator.isLastItem(2)).to.be.true;
    });

    it('should return false when set to first item', () => {
      expect(mutator.isLastItem(1)).to.be.false;
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
      expect(mutator.getInitial().positions).to.be.empty;
    });
  });

  describe('compute positions', () => {
    const threeCodeMutator = new BoardStateMutator(1, 3, ['Red', 'Blue', 'Yellow']);

    describe('getCorrectPositions', () => {
      it('when 0 correct position then return 0', () => {
        expect(threeCodeMutator.getCorrectPositions(['Green', 'Green', 'Black'])).to.equal(0);
      });

      it('when 1 correct & 1 wrong position then return 1', () => {
        expect(threeCodeMutator.getCorrectPositions(['Red', 'Green', 'Blue'])).to.equal(1);
      });

      it('when 2 correct position then return 2', () => {
        expect(threeCodeMutator.getCorrectPositions(['Red', 'Green', 'Yellow'])).to.equal(2);
      });
    });

    describe('getWrongPositions', () => {
      it('when none colors match then return 0', () => {
        expect(threeCodeMutator.getWrongPositions(['Black', 'Green', 'Black'])).to.equal(0);
      });

      it('when all correct positions then return 0', () => {
        expect(threeCodeMutator.getWrongPositions(['Red', 'Blue', 'Yellow'])).to.equal(0);
      });

      it('when 2 wrong positions then return 2', () => {
        expect(threeCodeMutator.getWrongPositions(['Blue', 'Red', 'Black'])).to.equal(2);
      });
    });

    describe('getPositions', () => {
      it('should return expected positions', () => {
        expect(threeCodeMutator.getPositions(['Red', 'Green', 'Blue'])).to.deep.equal({
          numberOfCorrectPositions: 1,
          numberOfWrongPositions: 1,
        });
      });
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
      const prev = {
        positions: [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }],
        row: 2,
        item: 1,
        boardColors: [['lightgrey', 'lightgrey'], ['Red', 'lightgrey']],
      };

      const next = mutator.getNext('Blue')(prev);

      expect(next.positions).to.deep.equal([
        { numberOfCorrectPositions: 1, numberOfWrongPositions: 0 },
        { numberOfCorrectPositions: 2, numberOfWrongPositions: 0 },
      ]);
    });
  });
});
