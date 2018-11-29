import StatusFactory from 'components/Status/StatusFactory';

describe('StatusFactory', () => {
  describe('render', () => {
    describe('isWin true', () => {
      it('should display win message', () => {
        expect(mount(StatusFactory.create(true)).find('.Status').text()).to.equal('You win');
      });
    });

    describe('isWin false', () => {
      it('should display loose message', () => {
        expect(mount(StatusFactory.create(false)).find('.Status').text()).to.equal('You loose');
      });
    });
  });
});
