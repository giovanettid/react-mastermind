import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  it('should display ColorPicker with n ColorItem', () => {
    const wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} />);

    expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
    expect(wrapper.find('.ColorItem_color_yellow').exists()).to.be.true;
    expect(wrapper.find('.ColorItem_color_black').exists()).to.be.true;
  });
});
