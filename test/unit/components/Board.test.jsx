import React from 'react';

import Board from 'components/Board/Board';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board />);
  });

  it('should display 10 Row', () => {
    expect(wrapper.find('tr.row')).to.have.lengthOf(10);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('.colorPicker')).to.have.lengthOf(1);
  });
});
