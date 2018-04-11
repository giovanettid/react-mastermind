import React from 'react';

import Rows from 'components/Rows/Rows';
import Row from 'components/Row/Row';

describe('Rows', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Rows boardColors={[['Red', 'lightgrey'], ['lightgrey', 'lightgrey']]} />);
  });

  describe('render', () => {
    it('should display Rows with 2 Row', () => {
      expect(wrapper.find('.Row')).to.have.lengthOf(2);
    });
  });

  describe('inverse display from boardColors', () => {
    it('should pass Red color to last Row', () => {
      expect(wrapper.find(Row).last().props().codeColors.includes('Red')).to.be.true;
    });
  });
});
