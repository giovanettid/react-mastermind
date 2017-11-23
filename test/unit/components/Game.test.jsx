import React from 'react';
import Game from 'components/Game';

describe('Game', () => {
  it('should display js starter template', () => {
    const wrapper = shallow(<Game />);

    expect(wrapper.find('.starter').text()).to.equal('js starter...');
  });
});
