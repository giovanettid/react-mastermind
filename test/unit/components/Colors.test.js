import sinon from 'sinon';

import Colors from 'components/Colors';

describe('Colors', () => {
  let sandbox;
  let stubApplyRandom;
  let colors;

  const expectedColors = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];

  const checkColor = color => expect(color).to.be.oneOf(expectedColors);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    stubApplyRandom = sandbox.stub().returns('0.9');
    colors = new Colors(stubApplyRandom);
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
    it('should use applyRandom 4 times', () => {
      colors.shuffle();

      expect(stubApplyRandom.callCount).to.equal(4);
    });

    it('should contains all correct colors', () => {
      colors.shuffle().every(checkColor);
    });

    it('should pick 4 colors', () => {
      expect(colors.shuffle()).to.have.lengthOf(4);
    });
  });

  describe('pick', () => {
    it('should use applyRandom', () => {
      colors.pick();

      expect(stubApplyRandom.calledOnce).to.be.true;
    });

    it('should return a correct color', () => {
      checkColor(colors.pick());
    });
  });
});
