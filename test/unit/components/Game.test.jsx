import React from 'react';

import Game from 'components/Game/Game';

describe('Game', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Game />);
  });
  it('should display Board', () => {
    expect(wrapper.find('table.board')).to.have.lengthOf(1);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('table.picker')).to.have.lengthOf(1);
  });

  it('should display 6 ColorItem', () => {
    expect(wrapper.find('.colorItem')).to.have.lengthOf(6);
  });
});
