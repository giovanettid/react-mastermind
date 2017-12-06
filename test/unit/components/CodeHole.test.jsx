import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';

describe('CodeHole', () => {
  it('should display CodeHole', () => {
    const wrapper = shallow(<CodeHole />);

    expect(wrapper.find('td.Hole_large')).to.have.lengthOf(1);
  });
});
