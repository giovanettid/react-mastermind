import React from 'react';
import Game from 'components/Game';

describe('Game', () => {
  it('should display Board', () => {
    const wrapper = mount(<Game />);

    expect(wrapper.find('.board')).to.have.lengthOf(1);
  });
});
