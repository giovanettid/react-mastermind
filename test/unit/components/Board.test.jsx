import React from 'react';

import Board from 'components/Board/Board';
import Rows from 'components/Rows/Rows';
import Row from 'components/Row/Row';
import CodeHole from 'components/CodeHole/CodeHole';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Board colorsToPick={['Yellow', 'Green']} />);
  });

  describe('state', () => {
    it('should init with first code hole and lightgrey', () => {
      expect(wrapper.state()).to.deep.equal({
        row: 1, item: 1, boardColors: new Array(10).fill(new Array(4).fill('lightgrey')),
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
    it('should change state to next item', () => {
      wrapper.find('.ColorItem_color_green').simulate('click');

      expect(wrapper.state().item).to.equal(2);
    });

    describe('click 2 ColorItem', () => {
      it('should pass boardColors to Rows with correct colors in each item', () => {
        wrapper.find('.ColorItem_color_green').simulate('click');
        wrapper.find('.ColorItem_color_yellow').simulate('click');

        const boardColors = wrapper.find(Rows).prop('boardColors');
        expect(boardColors[0][0]).to.equal('Green');
        expect(boardColors[0][1]).to.equal('Yellow');
      });

      it('should pass correct color to first and second CodeHole on the first Row', () => {
        wrapper.find('.ColorItem_color_green').simulate('click');
        wrapper.find('.ColorItem_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).first().find(CodeHole);
        expect(codeHoles.first().prop('color')).to.be.equal('Green');
        expect(codeHoles.at(1).prop('color')).to.be.equal('Yellow');
      });
    });
  });
});
