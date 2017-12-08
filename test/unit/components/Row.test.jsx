import React from 'react';

import Row from 'components/Row/Row';

describe('Row', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <table><tbody>
        <Row nextCode={{ row: 2, item: 1 }} />
      </tbody></table>);
  });

  describe('render', () => {
    it('should display a Row with 4 Code large Hole', () => {
      expect(wrapper.find('.Hole_large')).to.have.lengthOf(4);
    });

    it('should display a Row with 4 Key small Hole', () => {
      expect(wrapper.find('.Hole_small')).to.have.lengthOf(4);
    });
  });
});
