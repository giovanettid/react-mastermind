import Shuffle from 'components/Shuffle';

describe('Shuffle', () => {
  describe('colors', () => {
    it('should return all correct colors', () => {
      const shuffle = new Shuffle();
      expect(shuffle.colors).to.deep.equal(['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']);
    });
  });

  describe('fetch', () => {
    it('should shuffle all correct colors', () => {
      const shuffle = new Shuffle();
      expect(shuffle.fetch()).to.have.members(['Blue', 'Red', 'Yellow', 'Green', 'White', 'Black']);
    });
  });
});
