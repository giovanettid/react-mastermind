import Colors from 'components/Colors/Colors';
import ColorsFactory from 'components/Colors/ColorsFactory';

describe('ColorsFactory', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('create', () => {
    it('should return instance of Colors', () => {
      expect(ColorsFactory.create()).toBeInstanceOf(Colors);
    });

    it('should use Math.random when shuffle', () => {
      const spy = sandbox.spy(Math, 'random');

      ColorsFactory.create().shuffle();

      expect(spy).toHaveBeenCalled();
    });
  });
});
