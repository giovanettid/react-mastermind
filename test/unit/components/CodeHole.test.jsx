import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';

describe('CodeHole', () => {
  it('should display CodeHole with lightgrey color by default', () => {
    const wrapper = shallow(<CodeHole />);

    expect(wrapper.find('td.Hole_large').hasClass('Hole_large_color_lightgrey')).to.be.true;
  });
});
