import React from 'react';

import Rows from 'components/Rows/Rows';

describe('Rows', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Rows nextCode={{ row: 2, item: 1 }} />);
  });

  describe('render', () => {
    it('should display Rows with 10 Row', () => {
      expect(wrapper.find('.Row')).to.have.lengthOf(10);
    });
  });

  describe('props', () => {
    it('should receive nextCode prop', () => {
      expect(wrapper.prop('nextCode')).to.deep.equal({ row: 2, item: 1 });
    });
  });
});
