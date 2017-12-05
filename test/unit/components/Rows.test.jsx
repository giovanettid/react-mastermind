import React from 'react';

import Rows from 'components/Rows/Rows';

describe('Rows', () => {
  it('should display Rows with 10 Row', () => {
    const wrapper = mount(<Rows />);

    expect(wrapper.find('.Row')).to.have.lengthOf(10);
  });
});
