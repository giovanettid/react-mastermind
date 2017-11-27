import React from 'react';

import Board from 'components/Board/Board';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  it('should display 10 Row', () => {
    expect(wrapper.find('tr.row')).to.have.lengthOf(10);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('.colorPicker')).to.have.lengthOf(1);
  });

  it('should display 2 ColorItem', () => {
    expect(wrapper.find('.colorItem')).to.have.lengthOf(2);
  });
});
