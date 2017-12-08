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

  describe('render', () => {
    it('should display ColorItem with a color', () => {
      expect(wrapper.find('button.ColorItem').hasClass('ColorItem_color_red')).to.be.true;
    });
  });

  describe('on click', () => {
    it('should call onColorClick once', () => {
      wrapper.find('button').simulate('click');

      expect(spyClick.calledOnce).to.be.true;
    });

    it('should call onColorClick with color prop', () => {
      wrapper.find('button').simulate('click');

      expect(spyClick.calledWith('Red')).to.be.true;
    });
  });
});
