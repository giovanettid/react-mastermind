import React from 'react';

import Row from 'components/Row';

describe('Row', () => {
  it('should display a Row with 4 Hole', () => {
    const wrapper = mount(
      <table><tbody>
        <Row />
      </tbody></table>);

    const row = wrapper.find('td.hole')
      .map(node => node.text())
      .join('');

    expect(row).to.eql('OOOO');
  });
});
