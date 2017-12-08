import React from 'react';

import KeyHole from 'components/KeyHole/KeyHole';

describe('KeyHole', () => {
  it('should display KeyHole', () => {
    const wrapper = shallow(<KeyHole />);

    expect(wrapper.find('td.KeyHole')).to.have.lengthOf(1);
  });
});
