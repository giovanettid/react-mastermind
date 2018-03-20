import React from 'react';

import Board from 'components/Board/Board';
import Row from 'components/Row/Row';
import CodeHole from 'components/CodeHole/CodeHole';

describe('Board', () => {
  const NB_ROWS = 10;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  describe('state', () => {
    it('should init with initial position and lightgrey', () => {
      expect(wrapper.state()).to.deep.equal({ boardColors: new Array(NB_ROWS).fill(new Array(4).fill('lightgrey')) });
    });
  });

  describe('render', () => {
    it('should display Rows', () => {
      expect(wrapper.find('.Rows')).to.have.lengthOf(1);
    });

    it('should display ColorPicker', () => {
      expect(wrapper.find('tr.ColorPicker')).to.have.lengthOf(1);
    });

    it('should display 2 ClickableColor', () => {
      expect(wrapper.find('.ClickableColor')).to.have.lengthOf(2);
    });
  });

  describe('click ClickableColor(s)', () => {
    describe('click 2 ClickableColor', () => {
      it('should pass correct color to first and second CodeHole on the last Row', () => {
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).last().find(CodeHole);
        expect(codeHoles.first().prop('color')).to.be.equal('Green');
        expect(codeHoles.at(1).prop('color')).to.be.equal('Yellow');
      });
    });

    describe('click 5 ClickableColor', () => {
      it('should pass correct color to first CodeHole on the 9th Row', () => {
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');

        const codeHoles = wrapper.find(Row).at(NB_ROWS - 2).find(CodeHole);
        expect(codeHoles.first().prop('color')).to.be.equal('Green');
      });
    });
  });
});
