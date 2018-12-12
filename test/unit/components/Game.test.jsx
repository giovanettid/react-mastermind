import React from 'react';

import Game from 'components/Game/Game';
import GameConfiguration from 'components/Game/GameConfiguration';

describe('Game', () => {
  const configuration = () => ({ ...new GameConfiguration() });

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Game configuration={configuration} />);
  });
  it('should display Board', () => {
    expect(wrapper.find('.Board')).to.have.lengthOf(1);
  });

  it('should display ColorPicker with 6 ClickableColor', () => {
    expect(wrapper.find('.ColorPicker .ClickableColor')).to.have.lengthOf(6);
  });

  describe('on click reset button', () => {
    it('should reset game', () => {
      const initialState = wrapper.state();

      expect(wrapper.find('.ColorItem_color_lightgrey')).to.have.lengthOf(40);

      wrapper.find('button.ClickableColor').first().simulate('click');
      expect(wrapper.find('.ColorItem_color_lightgrey')).to.have.lengthOf(39);

      wrapper.find('.Reset button').simulate('click');

      expect(wrapper.find('.ColorItem_color_lightgrey')).to.have.lengthOf(40);
      expect(wrapper.state()).to.not.equal(initialState);
    });
  });
});
