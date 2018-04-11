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
    it('should return initial boardColors', () => {
      expect(mutator.getInitial().boardColors).to.have.lengthOf(2);
    });

    it('should return empty initial boardKeyColors', () => {
      expect(mutator.getInitial().boardKeyColors).to.be.empty;
    });
  });

  describe('muteBoardKeyColors', () => {
    it('should not append boardKeyColors when first column', () => {
      sandbox.stub(model, 'isLastColumn').returns(false);
      const boardKeyColors = [['Black', 'White']];

      expect(mutator.muteBoardKeyColors(boardKeyColors, ['Red', 'Green'])).to.deep.equal(boardKeyColors);
    });

    it('should append boardKeyColors when last column', () => {
      sandbox.stub(model, 'isLastColumn').returns(true);

      expect(mutator.muteBoardKeyColors([['Black', 'White']],
        ['Red', 'Blue'])).to.deep.equal([['Black', 'White'], ['Black', 'Black']]);
    });
  });

  describe('muteState', () => {
    it('should mute color at row, col indexes & return boardKeyColors', () => {
      sandbox.stub(model, 'nextIndexes').returns({ row: 1, col: 0 });
      const prev = { boardKeyColors: [], boardColors: [['Yellow', 'Yellow'], ['lightgrey', 'lightgrey']] };

      const next = mutator.muteState('Green')(prev);

      expect(next.boardColors).to.deep.equal([['Yellow', 'Yellow'], ['Green', 'lightgrey']]);
      expect(next.boardKeyColors).to.be.not.empty;
    });
  });

  describe('getNext', () => {
    it('should mute state from next item', () => {
      model.nbMove = 3;
      const prev = { boardKeyColors: [], boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not mute when already last move', () => {
      sandbox.stub(model, 'isLastMove').returns(true);
      const prev = { boardColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update boardKeyColors when choose correct position', () => {
      model.nbMove = 3;

      const prev = {
        boardKeyColors: [['Black', 'lightgrey']],
        boardColors: [['Red', 'Yellow'], ['Red', 'lightgrey']],
      };

      const next = mutator.getNext('Blue')(prev);

      expect(next.boardKeyColors).to.deep.equal([['Black', 'lightgrey'], ['Black', 'Black']]);
    });
  });
});
