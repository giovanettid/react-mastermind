import Colors from 'components/Colors';
import sinon from 'sinon';

describe('Colors', () => {
  let sandbox;
  let spyApplyRandom;
  let colors;

  const expectedColors = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];

  const checkColor = color => expect(color).to.be.oneOf(expectedColors);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spyApplyRandom = sandbox.spy();
    colors = new Colors(spyApplyRandom);
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
    it('should use applyRandom', () => {
      colors.shuffle();

      expect(spyApplyRandom.called).to.be.true;
    });

    it('should contains all correct colors', () => {
      colors.shuffle().every(checkColor);
    });

    it('should pick 4 colors', () => {
      expect(colors.shuffle()).to.have.lengthOf(4);
    });
  });
});
