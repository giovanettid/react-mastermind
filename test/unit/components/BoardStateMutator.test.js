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

    it('should return initial decoded false', () => {
      expect(mutator.getInitial().decoded).to.be.false;
    });

    it('should return initial endOfGame false', () => {
      expect(mutator.getInitial().endOfGame).to.be.false;
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

    describe('first column', () => {
      const prev = {
        boardKeyColors: [['Black', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Red', 'Yellow'], ['lightgrey', 'lightgrey']],
      };

      beforeEach(() => {
        model.nbMove = 2;
      });

      it('should not mute boardKeyColors', () => {
        const next = mutator.muteState('Red')(prev);

        expect(next.boardKeyColors).to.deep.equal(prev.boardKeyColors);
      });

      it('should not be decoded', () => {
        const next = mutator.muteState('Red')(prev);

        expect(next.decoded).to.be.false;
      });
    });

    describe('last column', () => {
      const prev = {
        boardKeyColors: [['Black', 'lightgrey'], ['lightgrey', 'lightgrey']],
        boardCodeColors: [['Red', 'Yellow'], ['Red', 'lightgrey']],
      };

      beforeEach(() => {
        model.nbMove = 3;
      });

      it('should mute boardKeyColors', () => {
        const next = mutator.muteState('Blue')(prev);

        expect(next.boardKeyColors).to.deep.equal([['Black', 'lightgrey'], ['Black', 'Black']]);
      });

      it('should not be decoded when boardKeyColors are not all Black', () => {
        const next = mutator.muteState('Yellow')(prev);

        expect(next.decoded).to.be.false;
      });

      it('should be endOfGame when last move and not decoded', () => {
        const next = mutator.muteState('Yellow')(prev);

        expect(next.endOfGame).to.be.true;
      });

      it('should be decoded when boardKeyColors are all Black', () => {
        const next = mutator.muteState('Blue')(prev);

        expect(next.decoded).to.be.true;
      });

      it('should be endOfGame when decoded', () => {
        const next = mutator.muteState('Blue')(prev);

        expect(next.decoded).to.be.true;
        expect(next.endOfGame).to.be.true;
      });
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
