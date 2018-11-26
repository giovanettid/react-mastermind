import React from 'react';

import Status from 'components/Status/Status';

describe('Status', () => {
  const wrapper = mount(<Status />);

  describe('render', () => {
    it('should display empty Status', () => {
      expect(wrapper.find('.Status').text()).to.be.empty;
    });
  });
});
