import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  it('should display ColorItem with correct color', () => {
    const wrapper = shallow(<ColorItem color="Green" />);

    expect(wrapper.find('td.ColorItem').hasClass('ColorItem_color_green')).to.be.true;
  });
});
