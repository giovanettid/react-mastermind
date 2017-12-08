import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';

describe('CodeHole', () => {
  it('should display CodeHole with lightgrey color by default', () => {
    const wrapper = shallow(<CodeHole />);

    expect(wrapper.find('td.CodeHole').hasClass('CodeHole_color_lightgrey')).to.be.true;
  });

  it('should display CodeHole with correct color', () => {
    const wrapper = shallow(<CodeHole color={'Green'} />);

    expect(wrapper.find('td.CodeHole').hasClass('CodeHole_color_green')).to.be.true;
  });
});
