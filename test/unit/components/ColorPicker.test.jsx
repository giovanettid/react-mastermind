import React from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ColorPicker colors={['Yellow', 'Black']} />);
  });

  describe('render', () => {
    it('should display ColorPicker with n ColorItem', () => {
      expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
      expect(wrapper.find('.ColorItem_color_yellow').exists()).to.be.true;
      expect(wrapper.find('.ColorItem_color_black').exists()).to.be.true;
    });
  });

  describe('click a ColorItem', () => {
    it('should change pick state to correct color', () => {
      wrapper.find('.ColorItem_color_black').simulate('click');

      expect(wrapper.state('pick')).to.equal('Black');
    });
  });
});
