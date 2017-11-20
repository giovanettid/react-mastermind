import Colors from 'components/Colors';
import sinon from 'sinon';

describe('Colors', () => {
  let sandbox;
  let colors;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    colors = new Colors();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('set atribute', () => {
    it('should equal to all correct colors', () => {
      expect(colors.set).to.deep.equal(['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']);
    });
  });

  describe('shuffle', () => {
    it('should shuffle each color with Math.random', () => {
      const spy = sandbox.spy(Math, 'random');

      colors.shuffle();

      expect(spy.callCount).to.be.at.least(colors.set.length);
    });

    it('should contains all correct colors', () => {
      expect(colors.shuffle()).to.have.members(['Blue', 'Red', 'Yellow', 'Green', 'White', 'Black']);
    });
  });
});
