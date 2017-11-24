import React from 'react';
import Board from 'components/Board';

describe('Board', () => {
  it('should display 10 Row', () => {
    const wrapper = mount(<Board />);

    expect(wrapper.find('.row')).to.have.lengthOf(10);
  });
});
