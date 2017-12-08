import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} />);
  });

  it('should display ColorPicker with n ColorItem', () => {
    expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
    expect(wrapper.find('.ColorItem_color_yellow').exists()).to.be.true;
    expect(wrapper.find('.ColorItem_color_black').exists()).to.be.true;
  });

  it('should handle color black click', () => {
    wrapper.find('.ColorItem_color_black').simulate('click');

    expect(wrapper.state('click')).to.be.true;
  });
});
