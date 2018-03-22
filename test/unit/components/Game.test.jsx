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

  it('should display ColorPicker with 6 ClickableColor', () => {
    expect(wrapper.find('.ColorPicker .ClickableColor')).to.have.lengthOf(6);
  });

  it('should render hidden Solution with 4 ColorItem', () => {
    expect(wrapper.find('.Solution_hidden .ColorItem')).to.have.lengthOf(4);
  });
});
