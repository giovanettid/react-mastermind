import BoardStateMutator from 'components/Board/BoardStateMutator';

import BoardModel from 'components/Board/BoardModel';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

describe('BoardStateMutator', () => {
  let sandbox;
  let mutator;
  let model;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    model = new BoardModel(2, 2);
    mutator = new BoardStateMutator(model, new ColorsDecoder(['Red', 'Blue']));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getInitial', () => {
    it('should return initial board colors', () => {
      expect(mutator.getInitial().boardCodeColors).to.have.lengthOf(2);
      expect(mutator.getInitial().boardKeyColors).to.have.lengthOf(2);
    });
  });

  describe('mapKeyColors', () => {
    it('should map keyColors (2 correct)', () => {
      expect(mutator.mapKeyColors(['Red', 'Blue']))
        .to.deep.equal(['Black', 'Black']);
    });

    it('should map keyColors (2 wrong)', () => {
      expect(mutator.mapKeyColors(['Blue', 'Red']))
        .to.deep.equal(['White', 'White']);
    });

    it('should map keyColors (0 correct, 0 wrong)', () => {
      expect(mutator.mapKeyColors(['Yellow', 'Green']))
        .to.deep.equal(['lightgrey', 'lightgrey']);
    });
  });

  describe('muteState', () => {
    it('should mute code color at row, col indexes', () => {
      model.nbMove = 2;

      const prev = {
        boardKeyColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Yellow', 'Yellow'], ['lightgrey', 'lightgrey']],
      };

      const next = mutator.muteState('Green')(prev);

      expect(next.boardCodeColors).to.deep.equal([['Yellow', 'Yellow'], ['Green', 'lightgrey']]);
    });

    it('should not mute boardKeyColors when first column', () => {
      model.nbMove = 2;

      const prev = {
        boardKeyColors: [['Black', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Red', 'Yellow'], ['lightgrey', 'lightgrey']],
      };

      const next = mutator.muteState('Red')(prev);

      expect(next.boardKeyColors).to.deep.equal(prev.boardKeyColors);
    });

    it('should mute boardKeyColors when last column', () => {
      model.nbMove = 3;

      const prev = {
        boardKeyColors: [['Black', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Red', 'Yellow'], ['Red', 'lightgrey']],
      };

      const next = mutator.muteState('Blue')(prev);

      expect(next.boardKeyColors).to.deep.equal([['Black', 'lightgrey'], ['Black', 'Black']]);
    });
  });

  describe('getNext', () => {
    it('should mute state from next item', () => {
      model.nbMove = 3;
      const prev = {
        boardKeyColors: [['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']],
      };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.boardCodeColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not mute when already last move', () => {
      sandbox.stub(model, 'isLastMove').returns(true);
      const prev = { boardCodeColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update boardKeyColors when choose correct position', () => {
      model.nbMove = 3;

      const prev = {
        boardKeyColors: [['Black', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Red', 'Yellow'], ['Red', 'lightgrey']],
      };

      const next = mutator.getNext('Blue')(prev);

      expect(next.boardKeyColors).to.deep.equal([['Black', 'lightgrey'], ['Black', 'Black']]);
    });
  });
});
