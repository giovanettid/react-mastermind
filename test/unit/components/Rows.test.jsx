import React from 'react';

import Rows from 'components/Rows/Rows';
import Row from 'components/Row/Row';

describe('Rows', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Rows {...{ row: 2, item: 1, color: 'Red' }} />);
  });

  describe('render', () => {
    it('should display Rows with 10 Row', () => {
      expect(wrapper.find('.Row')).to.have.lengthOf(10);
    });
  });

  describe('props', () => {
    it('should receive row, item & color props', () => {
      expect(wrapper.props()).to.deep.equal({ row: 2, item: 1, color: 'Red' });
    });

    it('should receive color prop', () => {
      expect(wrapper.prop('color')).to.equal('Red');
    });

    it('should pass color prop to only 1 Row', () => {
      expect(wrapper.find(Row)
        .map(node => node.prop('color')).filter(color => color))
        .to.have.lengthOf(1);
    });
  });
});
