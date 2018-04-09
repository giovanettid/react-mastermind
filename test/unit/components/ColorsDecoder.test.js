import ColorsDecoder from 'components/Colors/ColorsDecoder';

describe('ColorsDecoder', () => {
  let decoder;

  beforeEach(() => {
    decoder = new ColorsDecoder(['Red', 'Blue', 'Yellow']);
  });


  describe('getCorrectPositions', () => {
    it('when 0 correct position then return 0', () => {
      expect(decoder.getCorrectPositions(['Green', 'Green', 'Black'])).to.equal(0);
    });

    it('when 1 correct & 1 wrong position then return 1', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Blue'])).to.equal(1);
    });

    it('when 2 correct position then return 2', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Yellow'])).to.equal(2);
    });
  });

  describe('getWrongPositions', () => {
    it('when none colors match then return 0', () => {
      expect(decoder.getWrongPositions(['Black', 'Green', 'Black'])).to.equal(0);
    });

    it('when all correct positions then return 0', () => {
      expect(decoder.getWrongPositions(['Red', 'Blue', 'Yellow'])).to.equal(0);
    });

    it('when 2 wrong positions then return 2', () => {
      expect(decoder.getWrongPositions(['Blue', 'Red', 'Black'])).to.equal(2);
    });
  });
});
