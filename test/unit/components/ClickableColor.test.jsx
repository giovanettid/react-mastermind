import React from 'react';

import ClickableColor from 'components/ClickableColor/ClickableColor';

describe('ClickableColor', () => {
  const sandbox = sinon.createSandbox();

  let spyClick;
  let wrapper;

  beforeEach(() => {
    spyClick = sandbox.spy();
    wrapper = shallow(<ClickableColor color="Red" onColorClick={spyClick} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ClickableColor with a color', () => {
      expect(wrapper.find('button.ClickableColor').hasClass('ClickableColor_color_red')).to.be.true;
    });
  });

  describe('on click', () => {
    it('should call onColorClick once', () => {
      wrapper.find('button').simulate('click');

      expect(spyClick.calledOnce).to.be.true;
    });

    it('should call onColorClick with color prop', () => {
      wrapper.find('button').simulate('click');

      expect(spyClick.calledWith('Red')).to.be.true;
    });
  });
});
