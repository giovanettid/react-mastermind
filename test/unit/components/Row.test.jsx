import React from 'react';
import Row from 'components/Row';

describe('Row', () => {
  it('should display a Row with 4 Hole', () => {
    const wrapper = mount(<Row />);

    const row = wrapper.find('.hole')
      .map(node => node.text())
      .join('');

    expect(row).to.eql('OOOO');
  });
});
