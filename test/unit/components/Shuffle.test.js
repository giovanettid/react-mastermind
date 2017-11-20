import Shuffle from 'components/Shuffle';
import sinon from 'sinon';

describe('Shuffle', () => {
  let shuffle;

  beforeEach(() => {
    shuffle = new Shuffle();
  });

  describe('colors', () => {
    it('should return all correct colors', () => {
      expect(shuffle.colors).to.deep.equal(['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']);
    });
  });

  describe('generate', () => {
    it('should use random method', () => {
      const spy = sinon.spy(Shuffle, 'random');

      shuffle.generate();

      expect(spy.calledOnce).to.be.true;
    });

    it('should shuffle all correct colors', () => {
      expect(shuffle.generate()).to.have.members(['Blue', 'Red', 'Yellow', 'Green', 'White', 'Black']);
    });
  });
});
