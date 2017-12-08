import React from 'react';

import Board from 'components/Board/Board';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  describe('render', () => {
    it('should display Rows', () => {
      expect(wrapper.find('.Rows')).to.have.lengthOf(1);
    });

    it('should display ColorPicker', () => {
      expect(wrapper.find('tr.ColorPicker')).to.have.lengthOf(1);
    });

    it('should display 2 ColorItem', () => {
      expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
    });
  });

  describe('click a ColorItem', () => {
    it('should change pick state to correct color', () => {
      wrapper.find('.ColorItem_color_green').simulate('click');

      expect(wrapper.state('pick')).to.equal('Green');
    });
  });
});
