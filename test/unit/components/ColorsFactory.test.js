import ColorsFactory from 'components/Colors/ColorsFactory';
import Colors from 'components/Colors/Colors';

describe('ColorsFactory', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create', () => {
    it('should return instance of Colors', () => {
      expect(ColorsFactory.create()).to.be.an.instanceof(Colors);
    });

    it('should use Math.random when shuffle', () => {
      const spy = sandbox.spy(Math, 'random');

      ColorsFactory.create().shuffle();

      expect(spy.called).to.be.true;
    });
  });
});
