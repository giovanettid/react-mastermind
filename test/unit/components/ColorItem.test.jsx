import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  it('should display ColorItem', () => {
    const wrapper = shallow(<ColorItem />);

    expect(wrapper.find('.colorItem')).to.have.lengthOf(1);
  });
});
