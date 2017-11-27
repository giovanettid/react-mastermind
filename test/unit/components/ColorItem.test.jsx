import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  it('should display ColorItem with a color', () => {
    const wrapper = shallow(<ColorItem color={'Red'} />);

    expect(wrapper.find('td.colorItem').hasClass('colorRed')).to.be.true;
  });
});
