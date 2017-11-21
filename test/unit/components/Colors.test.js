import Colors from 'components/Colors';
import sinon from 'sinon';

describe('Colors', () => {
  let sandbox;
  let colors;

  const expectedColors = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];

  const checkColor = color => expect(color).to.be.oneOf(expectedColors);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    colors = new Colors();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('set atribute', () => {
    it('should equal to all correct colors', () => {
      expect(colors.set).to.deep.equal(expectedColors);
    });
  });

  describe('shuffle', () => {
    it('should shuffle each color with Math.random', () => {
      const spy = sandbox.spy(Math, 'random');

      colors.shuffle();

      expect(spy.callCount).to.be.at.least(colors.set.length);
    });

    it('should contains all correct colors', () => {
      colors.shuffle().every(checkColor);
    });

    it('should pick 4 colors', () => {
      expect(colors.shuffle()).to.have.lengthOf(4);
    });
  });
});
