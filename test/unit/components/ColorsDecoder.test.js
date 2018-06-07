import ColorsDecoder from 'components/Colors/ColorsDecoder';

describe('ColorsDecoder', () => {
  let decoder;

  beforeEach(() => {
    decoder = new ColorsDecoder(['Red', 'Blue', 'Yellow']);
  });


  describe('getNbPositions', () => {
    it('when none colors match then return 0 correct and 0 wrong', () => {
      expect(decoder.getNbPositions(['Black', 'Green', 'Black'])).to.deep.equal({
        correct: 0, wrong: 0, rest: 3,
      });
    });

    it('when all correct positions then return 3 correct', () => {
      expect(decoder.getNbPositions(['Red', 'Blue', 'Yellow'])).to.deep.equal({
        correct: 3, wrong: 0, rest: 0,
      });
    });

    it('when 2 wrong positions then return 2 wrong and 0 correct', () => {
      expect(decoder.getNbPositions(['Blue', 'Red', 'Black'])).to.deep.equal({
        correct: 0, wrong: 2, rest: 1,
      });
    });

    describe('when same color has correct & wrong position but only once to decode ', () => {
      it('then return 1 correct and 0 wrong', () => {
        expect(decoder.getNbPositions(['Red', 'Red', 'Black'])).to.deep.equal({
          correct: 1, wrong: 0, rest: 2,
        });
      });
    });

    describe('when same color has correct & wrong position and twice to decode', () => {
      it('then return 1 correct and 1 wrong', () => {
        decoder = new ColorsDecoder(['Red', 'Blue', 'Red']);
        expect(decoder.getNbPositions(['Red', 'Red', 'Black'])).to.deep.equal({
          correct: 1, wrong: 1, rest: 1,
        });
      });
    });

    describe('when same color has 2 wrong position but only once to decode', () => {
      it('then return 0 correct and 1 wrong', () => {
        decoder = new ColorsDecoder(['Red', 'Blue', 'Red']);
        expect(decoder.getNbPositions(['Blue', 'Yellow', 'Blue'])).to.deep.equal({
          correct: 0, wrong: 1, rest: 2,
        });
      });
    });

    describe('when same color has 3 wrong position but only once to decode', () => {
      it('then return O correct and 1 wrong', () => {
        decoder = new ColorsDecoder(['Red', 'Blue', 'Green', 'Yellow']);
        expect(decoder.getNbPositions(['Black', 'Red', 'Red', 'Red'])).to.deep.equal({
          correct: 0, wrong: 1, rest: 3,
        });
      });
    });
  });

  describe('getCorrectPositions', () => {
    it('when 0 correct position then return empty array', () => {
      expect(ColorsDecoder.getCorrectPositions(
        ['Red', 'Blue', 'Yellow'],
        ['Green', 'Green', 'Black'],
      )).to.deep.equal([]);
    });

    it('when 1 correct & 1 wrong position then return index 0', () => {
      expect(ColorsDecoder.getCorrectPositions(
        ['Red', 'Blue', 'Yellow'],
        ['Red', 'Green', 'Blue'],
      )).to.deep.equal([0]);
    });

    it('when 2 correct position then return indexes 0 and 2', () => {
      expect(ColorsDecoder.getCorrectPositions(
        ['Red', 'Blue', 'Yellow'],
        ['Red', 'Green', 'Yellow'],
      )).to.deep.equal([0, 2]);
    });
  });

  describe('getNbWrongPositions', () => {
    it('when none colors match then return 0', () => {
      expect(ColorsDecoder.getNbWrongPositions(
        ['Red', 'Blue', 'Yellow'],
        ['Black', 'Green', 'Black'],
      )).to.equal(0);
    });

    it('when 2 wrong positions then return 2', () => {
      expect(ColorsDecoder.getNbWrongPositions(
        ['Red', 'Blue', 'Yellow'],
        ['Blue', 'Red', 'Black'],
      )).to.equal(2);
    });

    it('when same color has 2 wrong position but only once to decode then return 1', () => {
      expect(ColorsDecoder.getNbWrongPositions(
        ['Red', 'Blue', 'Red'],
        ['Blue', 'Yellow', 'Blue'],
      )).to.equal(1);
    });

    it('when same color has 3 wrong position but only once to decode then return 1', () => {
      expect(ColorsDecoder.getNbWrongPositions(
        ['Red', 'Blue', 'Green', 'Yellow'],
        ['Black', 'Red', 'Red', 'Red'],
      )).to.equal(1);
    });
  });

  describe('hasWrongPosition', () => {
    it('when color has wrong position then return true', () => {
      expect(ColorsDecoder.hasWrongPosition(['Red', 'Blue', 'Yellow'], 'Red', 1)).to.be.true;
    });

    it('when color is not present then return false', () => {
      expect(ColorsDecoder.hasWrongPosition(['Red', 'Blue', 'Yellow'], 'Green', 2)).to.be.false;
    });

    it('when color has correct position then return false', () => {
      expect(ColorsDecoder.hasWrongPosition(['Red', 'Blue', 'Yellow'], 'Red', 0)).to.be.false;
    });
  });
});
