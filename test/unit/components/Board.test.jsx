import React from 'react';

import Board from 'components/Board/Board';
import Row from 'components/Row/Row';
import CodeHole from 'components/CodeHole/CodeHole';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  describe('state', () => {
    it('should init with initial position and lightgrey', () => {
      expect(wrapper.state()).to.deep.equal({
        row: 0, item: 0, boardColors: new Array(10).fill(new Array(4).fill('lightgrey')),
      });
    });
  });

  describe('render', () => {
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

  describe('click ColorItem(s)', () => {
    describe('click 2 ColorItem', () => {
      it('should pass correct color to first and second CodeHole on the first Row', () => {
        wrapper.find('.ColorItem_color_green').simulate('click');
        wrapper.find('.ColorItem_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).first().find(CodeHole);
        expect(codeHoles.first().prop('color')).to.be.equal('Green');
        expect(codeHoles.at(1).prop('color')).to.be.equal('Yellow');
      });
    });

    describe('click 5 ColorItem', () => {
      it('should pass correct color to first CodeHole on the second Row', () => {
        wrapper.find('.ColorItem_color_green').simulate('click');
        wrapper.find('.ColorItem_color_yellow').simulate('click');
        wrapper.find('.ColorItem_color_green').simulate('click');
        wrapper.find('.ColorItem_color_yellow').simulate('click');
        wrapper.find('.ColorItem_color_green').simulate('click');

        const codeHoles = wrapper.find(Row).at(1).find(CodeHole);
        expect(codeHoles.first().prop('color')).to.be.equal('Green');
      });
    });
  });
});
