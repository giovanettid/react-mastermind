import Colors from 'components/Colors/Colors';

describe('Colors', () => {
  const sandbox = sinon.createSandbox();

  let stubApplyRandom;
  let colors;

  const expectedColors = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];

  beforeEach(() => {
    stubApplyRandom = sandbox.stub().returns('0.9');
    colors = new Colors(stubApplyRandom);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('set atribute', () => {
    it('should equal to all correct colors', () => {
      expect(colors.set).toEqual(expectedColors);
    });
  });

  describe('shuffle', () => {
    it('should use applyRandom 4 times', () => {
      colors.shuffle();

      expect(stubApplyRandom).toHaveBeenCalledTimes(4);
    });

    it('should contains all correct colors', () => {
      colors.shuffle().every((color) => expect(expectedColors.includes(color)).toBeTruthy());
    });

    it('should pick 4 colors', () => {
      expect(colors.shuffle()).toHaveLength(4);
    });
  });

  describe('pick', () => {
    it('should use applyRandom', () => {
      colors.pick();

      expect(stubApplyRandom).toHaveBeenCalledOnce();
    });

    it('should return a correct color', () => {
      expect(expectedColors.includes(colors.pick())).toBeTruthy();
    });
  });
});
