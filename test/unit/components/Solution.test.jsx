import React from 'react';

import Solution from 'components/Solution/Solution';

describe('Solution', () => {
  const wrapper = mount(<Solution colors={['Yellow', 'Green']} />);

  describe('render', () => {
    it('should display a Solution with 2 ColorItem', () => {
      expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
    });

    it('should display a Solution with 1 yellow ColorItem and 1 Green', () => {
      expect(wrapper.find('.ColorItem_color_yellow')).to.have.lengthOf(1);
      expect(wrapper.find('.ColorItem_color_green')).to.have.lengthOf(1);
    });

    it('should has Solution_hidden class', () => {
      expect(wrapper.find('tr.Solution').hasClass('Solution_hidden')).to.be.true;
    });
  });
});
