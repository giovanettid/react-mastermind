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

    it('should return empty initial positions', () => {
      expect(mutator.getInitial().positions).to.be.empty;
    });
  });

  describe('mutePositions', () => {
    it('should not append positions when first column', () => {
      sandbox.stub(model, 'isLastColumn').returns(false);
      const positions = [{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }];

      expect(mutator.mutePositions(positions, ['Red', 'Green'])).to.deep.equal(positions);
    });

    it('should append positions when last column', () => {
      sandbox.stub(model, 'isLastColumn').returns(true);

      expect(mutator.mutePositions([{ numberOfCorrectPositions: 1, numberOfWrongPositions: 0 }],
        ['Red', 'Blue'])).to.deep.equal([
        { numberOfCorrectPositions: 1, numberOfWrongPositions: 0 },
        { numberOfCorrectPositions: 2, numberOfWrongPositions: 0 },
      ]);
    });
  });

  describe('muteState', () => {
    it('should mute color at row, col indexes & return positions', () => {
      sandbox.stub(model, 'getIndexes').returns({ row: 1, col: 0 });
      const prev = { positions: [], boardColors: [['Yellow', 'Yellow'], ['lightgrey', 'lightgrey']] };

      const next = mutator.muteState('Green')(prev);

      expect(next.boardColors).to.deep.equal([['Yellow', 'Yellow'], ['Green', 'lightgrey']]);
      expect(next.positions).to.be.not.empty;
    });
  });

  describe('getNext', () => {
    it('should mute state from next item', () => {
      model.nbMove = 3;
      const prev = { positions: [], boardColors: [['lightgrey', 'lightgrey'], ['Green', 'lightgrey']] };

      const next = mutator.getNext('Yellow')(prev);

      expect(next.boardColors).to.deep.equal([['lightgrey', 'lightgrey'], ['Green', 'Yellow']]);
    });

    it('should not mute when already last move', () => {
      sandbox.stub(model, 'isLastMove').returns(true);
      const prev = { boardColors: [['Red', 'Red'], ['Green', 'Yellow']] };

      const next = mutator.getNext('Green')(prev);

      expect(next).to.deep.equal(prev);
    });

    it('should update position when choose correct position', () => {
      model.nbMove = 3;

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
