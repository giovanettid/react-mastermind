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

    it('should has Solution_hidden class', () => {
      expect(wrapper.find('tr.Solution').hasClass('Solution_hidden')).to.be.true;
    });

    describe('decoded solution', () => {
      it('should not have Solution_hidden class', () => {
        const decodedWrapper = mount(<Solution colors={['Yellow', 'Green', 'Green']} decoded />);

        expect(decodedWrapper.find('tr.Solution').hasClass('Solution_hidden')).to.be.false;
      });
    });
  });
});
