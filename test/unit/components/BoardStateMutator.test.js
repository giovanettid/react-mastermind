import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('BoardStateMutator', () => {
  let mutator;

  beforeEach(() => {
    mutator = new BoardStateMutator(2, 2, ['Red', 'Blue']);
  });

  describe('isFirstMove', () => {
    it('should return true when row & item undefined', () => {
      expect(mutator.isFirstMove()).to.be.true;
    });

    it('should return false when row is not undefined', () => {
      mutator.row = 1;

      expect(mutator.isFirstMove()).to.be.false;
    });

    it('should return false when item is not undefined', () => {
      mutator.item = 1;

      expect(mutator.isFirstMove()).to.be.false;
    });
  });

  describe('isLastItem', () => {
    it('should return true when current item is last item', () => {
      mutator.item = 1;

      expect(mutator.isLastItem()).to.be.true;
    });

    it('should return false when current item is first item', () => {
      mutator.item = 0;

      expect(mutator.isLastItem()).to.be.false;
    });
  });

  describe('isLastMove', () => {
    it('should return true when current position is last row and last item', () => {
      mutator.row = 1;
      mutator.item = 1;

      expect(mutator.isLastMove()).to.be.true;
    });

    it('should return false when current position is first row', () => {
      mutator.row = 0;
      mutator.item = 1;

      expect(mutator.isLastMove()).to.be.false;
    });
  });

  describe('firstMove', () => {
    it('should move state to first row, first item', () => {
      mutator.moveFirst();

      expect(mutator.row).to.equal(0);
      expect(mutator.item).to.equal(0);
    });
  });

  describe('nextRow', () => {
    it('should move state to next row, first item', () => {
      mutator.row = 0;
      mutator.item = 1;

      mutator.nextRow();

      expect(mutator.row).to.equal(1);
      expect(mutator.item).to.equal(0);
    });
  });

  describe('nextItem', () => {
    it('should move state to next item, same row', () => {
      mutator.row = 1;
      mutator.item = 0;

      mutator.nextItem();

      expect(mutator.row).to.equal(1);
      expect(mutator.item).to.equal(1);
    });
  });

  describe('move', () => {
    it('when row & item undefined then move to first row & first item', () => {
      mutator.move();

      expect(mutator.row).to.equal(0);
      expect(mutator.item).to.equal(0);
    });

    it('when last item then move to next row & first item', () => {
      mutator.row = 0;
      mutator.item = 1;

      mutator.move();

      expect(mutator.row).to.equal(1);
      expect(mutator.item).to.equal(0);
    });

    it('when first item then move to next item', () => {
      mutator.row = 1;
      mutator.item = 0;

      mutator.move();

      expect(mutator.row).to.equal(1);
      expect(mutator.item).to.equal(1);
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

  describe('muteState', () => {
    it('should mute color at row & item indexes', () => {
      mutator.row = 1;
      mutator.item = 0;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = mutator.muteState('Green')(prev);

      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'lightgrey']]);
    });

    it('should return positions when mute last item', () => {
      mutator.row = 1;
      mutator.item = 1;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['Red', 'lightgrey']] };

      const next = mutator.muteState('Blue')(prev);

      expect(next.positions).to.deep.equal([{
        numberOfCorrectPositions: 2,
        numberOfWrongPositions: 0,
      }]);
    });

    it('should not update positions when mute first item', () => {
      mutator.row = 1;
      mutator.item = 0;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']] };

      const next = mutator.muteState('Red')(prev);

      expect(next.positions).to.be.empty;
    });
  });

  describe('getNext', () => {
    it('should mute state from next item', () => {
      mutator.row = 1;
      mutator.item = 0;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not mute when position is last row and last item', () => {
      mutator.row = 1;
      mutator.item = 1;
      const prev = { boardColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update position when choose correct position', () => {
      mutator.row = 1;
      mutator.item = 0;
      const prev = {
        positions: [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }],
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
