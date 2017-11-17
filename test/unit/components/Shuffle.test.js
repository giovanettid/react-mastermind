import Shuffle from 'components/Shuffle';

describe('Shuffle', () => {
  describe('colors', () => {
    it('should return all correct colors', () => {
      const shuffle = new Shuffle();
      expect(shuffle.colors).to.deep.equal(['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']);
    });
  });
});
