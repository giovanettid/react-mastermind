import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('BoardStateMutator', () => {
  let mutator;

  beforeEach(() => {
    mutator = new BoardStateMutator(2, 2, ['Red', 'Blue']);
  });

  describe('isLastColumn', () => {
    it('should return true when current column is last column', () => {
      mutator.nbMove = 2;

      expect(mutator.isLastColumn()).to.be.true;
    });

    it('should return false when current column is first column', () => {
      mutator.nbMove = 1;

      expect(mutator.isLastColumn()).to.be.false;
    });
  });

  describe('isLastMove', () => {
    it('should return true when 4 move', () => {
      mutator.nbMove = 4;

      expect(mutator.isLastMove()).to.be.true;
    });

    it('should return false when 2 move', () => {
      mutator.nbMove = 2;

      expect(mutator.isLastMove()).to.be.false;
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
  });

  describe('mutePositions', () => {
    it('should leave positions empty when first move', () => {
      mutator.nbMove = 1;

      expect(mutator.mutePositions([], ['Red', 'lightgrey'])).to.be.empty;
    });

    it('should not append positions when first column', () => {
      const positions = [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }];
      mutator.nbMove = 3;

      expect(mutator.mutePositions(positions, ['Red', 'Green'])).to.deep.equal(positions);
    });

    it('should append positions when last column', () => {
      mutator.nbMove = 4;

      expect(mutator.mutePositions([{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }],
        ['Red', 'Blue'])).to.deep.equal([
        { numberOfCorrectPositions: 1, numberOfWrongPositions: 0 },
        { numberOfCorrectPositions: 2, numberOfWrongPositions: 0 },
      ]);
    });
  });

  describe('muteState', () => {
    it('should mute color at row & col indexes', () => {
      mutator.nbMove = 3;
      const prev = { positions: [], boardColors: [['Yellow', 'Yellow'], ['lightgrey', 'lightgrey']] };

      const next = mutator.muteState('Green')(prev);

      expect(next.boardColors).to.deep.equal([['Yellow', 'Yellow'], ['Green', 'lightgrey']]);
    });

    it('should return positions', () => {
      mutator.nbMove = 4;
      const prev = { positions: [], boardColors: [['Yellow', 'Yellow'], ['Red', 'lightgrey']] };

      const next = mutator.muteState('Blue')(prev);

      expect(next.positions).to.be.not.empty;
    });
  });

  describe('getNext', () => {
    it('should mute state from next item', () => {
      mutator.nbMove = 3;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not mute when already last move', () => {
      mutator.nbMove = 4;
      const prev = { boardColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update position when choose correct position', () => {
      mutator.nbMove = 3;
      const prev = {
        positions: [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }],
        boardColors: [['Red', 'Yellow'], ['Red', 'lightgrey']],
      };

      const next = mutator.getNext('Blue')(prev);

      expect(next.positions).to.deep.equal([
        { numberOfCorrectPositions: 1, numberOfWrongPositions: 0 },
        { numberOfCorrectPositions: 2, numberOfWrongPositions: 0 },
      ]);
    });
  });
});
