import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  it('should display ColorPicker with n ColorItem', () => {
    const wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} />);

    expect(wrapper.find('.colorItem')).to.have.lengthOf(2);
    expect(wrapper.find('.colorYellow').exists()).to.be.true;
    expect(wrapper.find('.colorBlack').exists()).to.be.true;
  });
});
