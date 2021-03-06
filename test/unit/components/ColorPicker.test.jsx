import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  const sandbox = sinon.createSandbox();

  let spyClick;
  let wrapper;

  beforeEach(() => {
    spyClick = sandbox.spy();
    wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} onColorClick={spyClick} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ColorPicker with n ClickableColor', () => {
      expect(wrapper.find('.ClickableColor')).to.have.lengthOf(2);
      expect(wrapper.find('.ClickableColor_color_yellow').exists()).to.be.true;
      expect(wrapper.find('.ClickableColor_color_black').exists()).to.be.true;
    });
  });

  describe('click a ClickableColor', () => {
    it('should call onColorClick once', () => {
      wrapper.find('.ClickableColor_color_black').simulate('click');

      expect(spyClick.calledOnce).to.be.true;
    });
  });
});
