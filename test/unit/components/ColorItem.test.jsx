import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  let sandbox;
  let wrapper;
  let spyClick;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spyClick = sandbox.spy();
    wrapper = shallow(<ColorItem color={'Red'} onColorClick={spyClick} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should display ColorItem with a color', () => {
    expect(wrapper.find('button.ColorItem').hasClass('ColorItem_color_red')).to.be.true;
  });

  it('should handle click', () => {
    wrapper.find('button').simulate('click');

    expect(spyClick.calledOnce).to.be.true;
  });
});
