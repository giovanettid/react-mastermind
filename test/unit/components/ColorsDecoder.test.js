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
  });

  describe('getCorrectPositions', () => {
    it('when 0 correct position then return empty array', () => {
      expect(decoder.getCorrectPositions(['Green', 'Green', 'Black'])).to.deep.equal([]);
    });

    it('when 1 correct & 1 wrong position then return index 0', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Blue'])).to.deep.equal([0]);
    });

    it('when 2 correct position then return 0 and 2 indexes', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Yellow'])).to.deep.equal([0, 2]);
    });
  });

  describe('getNbWrongPositions', () => {
    const truePredicate = () => true;
    const excludeFirst = (_, i) => i > 0;

    it('when none colors match then return 0', () => {
      expect(decoder.getNbWrongPositions(truePredicate)(['Black', 'Green', 'Black'])).to.equal(0);
    });

    it('when none colors match from index 1 then return 0', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Green', 'Yellow']);
      expect(decoder.getNbWrongPositions(excludeFirst)(['Red', 'Red', 'Red', 'Black'])).to.equal(0);
    });

    it('when 2 wrong positions then return 2', () => {
      expect(decoder.getNbWrongPositions(truePredicate)(['Blue', 'Red', 'Black'])).to.equal(2);
    });

    it('when same color has 2 wrong position but only once to decode then return 1', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Red']);
      expect(decoder.getNbWrongPositions(truePredicate)(['Blue', 'Yellow', 'Blue'])).to.equal(1);
    });

    it('when same color has 3 wrong position but only once to decode then return 1', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Green', 'Yellow']);
      expect(decoder.getNbWrongPositions(truePredicate)(['Black', 'Red', 'Red', 'Red'])).to.equal(1);
    });
  });
});
