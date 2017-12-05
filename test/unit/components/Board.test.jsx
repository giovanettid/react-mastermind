import React from 'react';

import Board from 'components/Board/Board';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  it('should display Rows', () => {
    expect(wrapper.find('.Rows')).to.have.lengthOf(1);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('tr.ColorPicker')).to.have.lengthOf(1);
  });

  it('should display 2 ColorItem', () => {
    expect(wrapper.find('.ColorItem')).to.have.lengthOf(2);
  });
});
