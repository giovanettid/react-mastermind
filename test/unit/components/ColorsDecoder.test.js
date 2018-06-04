import ColorsDecoder from 'components/Colors/ColorsDecoder';

describe('ColorsDecoder', () => {
  let decoder;

  beforeEach(() => {
    decoder = new ColorsDecoder(['Red', 'Blue', 'Yellow']);
  });


  describe('getNbCorrectPositions', () => {
    it('when 0 correct position then return 0', () => {
      expect(decoder.getNbCorrectPositions(['Green', 'Green', 'Black'])).to.equal(0);
    });

    it('when 1 correct & 1 wrong position then return 1', () => {
      expect(decoder.getNbCorrectPositions(['Red', 'Green', 'Blue'])).to.equal(1);
    });

    it('when 2 correct position then return 2', () => {
      expect(decoder.getNbCorrectPositions(['Red', 'Green', 'Yellow'])).to.equal(2);
    });
  });

  describe('getNbWrongPositions', () => {
    it('when none colors match then return 0', () => {
      expect(decoder.getNbWrongPositions(['Black', 'Green', 'Black'])).to.equal(0);
    });

    it('when none colors match then return 0', () => {
      expect(decoder.getNbWrongPositions(['Black', 'Green', 'Black'])).to.equal(0);
    });

    it('when all correct positions then return 0', () => {
      expect(decoder.getNbWrongPositions(['Red', 'Blue', 'Yellow'])).to.equal(0);
    });

    it('when 2 wrong positions then return 2', () => {
      expect(decoder.getNbWrongPositions(['Blue', 'Red', 'Black'])).to.equal(2);
    });

    it('when same color has correct & wrong position but only once to decode then return 0', () => {
      expect(decoder.getNbWrongPositions(['Red', 'Red', 'Black'])).to.equal(0);
    });

    it('when same color has correct & wrong position and twice to decode then return 1', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Red']);
      expect(decoder.getNbWrongPositions(['Red', 'Red', 'Black'])).to.equal(1);
    });

    it('when same color has 2 wrong position but only once to decode then return 1', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Red']);
      expect(decoder.getNbWrongPositions(['Blue', 'Yellow', 'Blue'])).to.equal(1);
    });

    it('when same color has 3 wrong position but only once to decode then return 1', () => {
      decoder = new ColorsDecoder(['Red', 'Blue', 'Green', 'Yellow']);
      expect(decoder.getNbWrongPositions(['Black', 'Red', 'Red', 'Red'])).to.equal(1);
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
