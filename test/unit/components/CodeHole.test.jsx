import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';

describe('CodeHole', () => {
  it('should display CodeHole with lightgrey color by default', () => {
    const wrapper = shallow(<CodeHole />);

    expect(wrapper.find('td.Hole_large').hasClass('Hole_large_color_lightgrey')).to.be.true;
  });

  it('should display CodeHole with correct color', () => {
    const wrapper = shallow(<CodeHole color={'Green'} />);

    expect(wrapper.find('td.Hole_large').hasClass('Hole_large_color_green')).to.be.true;
  });
});
