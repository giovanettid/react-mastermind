import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  let sandbox;
  let spyClick;
  let wrapper;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spyClick = sandbox.spy();
    wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} onColorClick={spyClick} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ColorPicker with n ColorItem', () => {
      expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
      expect(wrapper.find('.ColorItem_color_yellow').exists()).to.be.true;
      expect(wrapper.find('.ColorItem_color_black').exists()).to.be.true;
    });
  });

  describe('click a ColorItem', () => {
    it('should call onColorClick once', () => {
      wrapper.find('.ColorItem_color_black').simulate('click');

      expect(spyClick.calledOnce).to.be.true;
    });
  });
});
