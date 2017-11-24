import React from 'react';

import Hole from 'components/Hole';

describe('Hole', () => {
  it('should display Hole', () => {
    const wrapper = shallow(<Hole />);

    expect(wrapper.find('td.hole')).to.have.lengthOf(1);
  });
});
