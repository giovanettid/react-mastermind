import React from 'react';

import Solution from 'components/Solution/Solution';

describe('Solution', () => {
  const wrapper = mount(<Solution colors={['Yellow', 'Green', 'Green']} />);

  describe('render', () => {
    it('should display a Solution with 3 ColorItem', () => {
      expect(wrapper.find('.ColorItem')).to.have.lengthOf(3);
    });

    it('should display a Solution with 1 yellow ColorItem and 2 Green', () => {
      expect(wrapper.find('.ColorItem_color_yellow')).to.have.lengthOf(1);
      expect(wrapper.find('.ColorItem_color_green')).to.have.lengthOf(2);
    });
  });
});
