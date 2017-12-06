import React from 'react';

import Row from 'components/Row/Row';

describe('Row', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <table><tbody>
        <Row />
      </tbody></table>);
  });

  it('should display a Row with 4 Code large Hole', () => {
    expect(wrapper.find('.Hole_large')).to.have.lengthOf(4);
  });

  it('should display a Row with 4 Key small Hole', () => {
    expect(wrapper.find('.Hole_small')).to.have.lengthOf(4);
  });
});
