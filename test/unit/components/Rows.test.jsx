import React from 'react';

import Rows from 'components/Rows/Rows';
import Row from 'components/Row/Row';

describe('Rows', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Rows boardColors={[['lightgrey', 'lightgrey'], ['Red', 'lightgrey']]} />);
  });

  describe('render', () => {
    it('should display Rows with 2 Row', () => {
      expect(wrapper.find('.Row')).to.have.lengthOf(2);
    });
  });

  describe('props', () => {
    it('should pass non default color prop to only 1 Row', () => {
      expect(wrapper.find(Row)
        .map(node => node.prop('colors')).filter(colors => colors.includes('Red')))
        .to.have.lengthOf(1);
    });
  });
});
