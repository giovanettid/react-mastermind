import React from 'react';

import Rows from 'components/Rows/Rows';

describe('Rows', () => {
  it('should display Rows with n Row', () => {
    const wrapper = mount(<Rows nb={2} />);

    expect(wrapper.find('.row')).to.have.lengthOf(2);
  });
});
