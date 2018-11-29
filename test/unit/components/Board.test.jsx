import React from 'react';

import ColorsDecoder from 'components/Colors/ColorsDecoder';

import Board from 'components/Board/Board';
import BoardModel from 'components/Board/BoardModel';
import BoardStateMutator from 'components/Board/BoardStateMutator';

import Row from 'components/Row/Row';
import ColorItem from 'components/ColorItem/ColorItem';
import KeyHole from 'components/KeyHole/KeyHole';

describe('Board', () => {
  const NB_ROWS = 2;
  const NB_CODE_HOLES = 4;
  let wrapper;

  beforeEach(() => {
    const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);
    const colorsToGuess = ['Yellow', 'Yellow', 'Yellow', 'Yellow'];
    const colorsDecoder = new ColorsDecoder(colorsToGuess);
    const stateMutator = new BoardStateMutator(model, colorsDecoder);

    wrapper = mount(<Board
      colorsToPick={['Yellow', 'Green']}
      colorsToGuess={colorsToGuess}
      stateMutator={stateMutator}
    />);
  });

  describe('state', () => {
    it('should init boardCodeColors with nb_rows*4 lightgrey', () => {
      expect(wrapper.state().boardCodeColors).to.deep.equal(new Array(NB_ROWS).fill(new Array(4).fill('lightgrey')));
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

    it('should not display Status', () => {
      expect(wrapper.find('.Status').exists()).to.be.false;
    });
  });

  describe('click ClickableColor(s)', () => {
    const simulateLoose = () => {
      wrapper.find('.ClickableColor_color_green').simulate('click');
      wrapper.find('.ClickableColor_color_green').simulate('click');
      wrapper.find('.ClickableColor_color_green').simulate('click');
      wrapper.find('.ClickableColor_color_green').simulate('click');
    };

    const simulateWin = () => {
      wrapper.find('.ClickableColor_color_yellow').simulate('click');
      wrapper.find('.ClickableColor_color_yellow').simulate('click');
      wrapper.find('.ClickableColor_color_yellow').simulate('click');
      wrapper.find('.ClickableColor_color_yellow').simulate('click');
    };

    describe('click 2 ClickableColor', () => {
      it('should pass correct color to first and second ColorItem on the last Row', () => {
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).last().find(ColorItem);
        expect(codeHoles.first().props().color).to.equal('Green');
        expect(codeHoles.at(1).props().color).to.equal('Yellow');
      });
    });

    describe('click 5 ClickableColor', () => {
      it('should pass correct color to first ColorItem on the 9th Row', () => {
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');

        const codeHoles = wrapper.find(Row).at(NB_ROWS - 2).find(ColorItem);
        expect(codeHoles.first().props().color).to.equal('Green');
      });
    });

    describe('click 4 ClickableColor', () => {
      it('should pass correct color to first KeyHole on the last Row', () => {
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).at(NB_ROWS - 1).find(KeyHole);
        expect(codeHoles.first().props().color).to.equal('Black');
      });

      describe('click all correct colors', () => {
        it('should show Solution', () => {
          expect(wrapper.find('.Solution').exists()).to.be.false;

          simulateWin();

          expect(wrapper.find('.Solution').exists()).to.be.true;
        });

        it('should display win status message', () => {
          expect(wrapper.find('.Status').exists()).to.be.false;

          simulateWin();

          expect(wrapper.find('.Status').text()).to.equal('You win');
        });
      });
    });

    describe('click all colors', () => {
      describe('not guess correct colors', () => {
        it('should display loose status message', () => {
          simulateLoose();
          simulateLoose();

          expect(wrapper.find('.Status').text()).to.equal('You loose');
        });

        it('should show Solution', () => {
          simulateLoose();
          simulateLoose();

          expect(wrapper.find('.Solution').exists()).to.be.true;
        });
      });

      describe('guess correct colors', () => {
        it('should display win status message', () => {
          simulateLoose();
          simulateWin();

          expect(wrapper.find('.Status').text()).to.equal('You win');
        });
      });
    });
  });
});
