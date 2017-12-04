import React from 'react';

import Board from 'components/Board/Board';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  it('should display Rows', () => {
    expect(wrapper.find('.rows')).to.have.lengthOf(1);
  });

  it('should display ColorPicker', () => {
    expect(wrapper.find('tr.colorPicker')).to.have.lengthOf(1);
  });

  it('should display 2 ColorItem', () => {
    expect(wrapper.find('.colorItem')).to.have.lengthOf(2);
  });
});
