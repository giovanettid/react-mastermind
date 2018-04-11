import React from 'react';

import KeyHole from 'components/KeyHole/KeyHole';

describe('KeyHole', () => {
  it('should display KeyHole with correct color', () => {
    const wrapper = shallow(<KeyHole color={'Black'} />);

    expect(wrapper.find('td.KeyHole').hasClass('KeyHole_color_black')).to.be.true;
  });
});
