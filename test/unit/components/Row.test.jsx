import React from 'react';

import Row from 'components/Row';

describe('Row', () => {
  it('should display a Row with 4 Hole', () => {
    const wrapper = mount(
      <table><tbody>
        <Row />
      </tbody></table>);

    expect(wrapper.find('.hole')).to.have.lengthOf(4);
  });
});
