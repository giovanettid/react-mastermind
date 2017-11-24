import React from 'react';
import Hole from 'components/Hole';

describe('Hole', () => {
  it('should display Hole', () => {
    const wrapper = shallow(<Hole />);

    expect(wrapper.find('div').text()).to.equal('O');
  });
});