import React from 'react';

import Status from 'components/Status/Status';

describe('Status', () => {
  describe('render', () => {
    it('should display message', () => {
      const wrapper = mount(<Status message={'You win'} />);

      expect(wrapper.find('.Status').text()).to.equal('You win');
    });

    describe('default message', () => {
      it('should display empty Status', () => {
        const wrapper = mount(<Status />);

        expect(wrapper.find('.Status').text()).to.be.empty;
      });
    });
  });
});
