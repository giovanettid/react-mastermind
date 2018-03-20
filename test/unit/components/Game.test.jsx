import React from 'react';

import Game from 'components/Game/Game';

describe('Game', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Game />);
  });
  it('should display Board', () => {
    expect(wrapper.find('.Board')).to.have.lengthOf(1);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('.ColorPicker')).to.have.lengthOf(1);
  });

  it('should display 6 ClickableColor', () => {
    expect(wrapper.find('.ClickableColor')).to.have.lengthOf(6);
  });
});
