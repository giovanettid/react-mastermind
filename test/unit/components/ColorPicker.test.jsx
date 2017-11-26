import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  it('should display ColorPicker with 6 ColorItem', () => {
    const wrapper = mount(<ColorPicker />);

    expect(wrapper.find('.colorItem')).to.have.lengthOf(6);
  });
});
