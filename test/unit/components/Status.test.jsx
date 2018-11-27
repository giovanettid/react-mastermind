import React from 'react';

import Status from 'components/Status/Status';

describe('Status', () => {
  const wrapper = mount(<Status message={'You win'} />);

  describe('render', () => {
    it('should display message', () => {
      expect(wrapper.find('.Status').text()).to.equal('You win');
    });
  });
});
