import React from 'react';

import Board from 'components/Board/Board';
import Rows from 'components/Rows/Rows';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  describe('state', () => {
    it('should init with first code hole and lightgrey', () => {
      expect(wrapper.state()).to.deep.equal({ row: 1, item: 1, color: 'lightgrey' });
    });
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

      expect(wrapper.state('color')).to.equal('Green');
    });

    it('should pass boardColors to Rows with correct color', () => {
      wrapper.find('.ColorItem_color_green').simulate('click');

      const { row, item } = wrapper.state();
      expect(wrapper.find(Rows).prop('boardColors')[row - 1][item - 1]).to.equal('Green');
    });
  });
});
