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

  const sandbox = sinon.createSandbox();

  let wrapper;
  let spyClick;

  beforeEach(() => {
    spyClick = sandbox.spy();

    const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);
    const colorsToGuess = ['Yellow', 'Yellow', 'Yellow', 'Yellow'];
    const colorsDecoder = new ColorsDecoder(colorsToGuess);
    const stateMutator = new BoardStateMutator(model, colorsDecoder);

    wrapper = mount(<Board
      colorsToPick={['Yellow', 'Green']}
      colorsToGuess={colorsToGuess}
      stateMutator={stateMutator}
      onResetClick={spyClick}
    />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display Rows', () => {
      expect(wrapper.find('.Rows')).to.have.lengthOf(1);
    });

    it('should display nb rows*4 lightgrey ColorItem', () => {
      expect(wrapper.find('.ColorItem_color_lightgrey')).to.have.lengthOf(NB_ROWS * NB_CODE_HOLES);
    });

    it('should display ColorPicker', () => {
      expect(wrapper.find('.ColorPicker')).to.have.lengthOf(1);
    });

    it('should display 2 ClickableColor', () => {
      expect(wrapper.find('.ClickableColor')).to.have.lengthOf(2);
    });

    it('should not display Status', () => {
      expect(wrapper.find('.Status').exists()).to.be.false;
    });

    it('should display reset button', () => {
      expect(wrapper.find('.Reset button').exists()).to.be.true;
    });
  });

  describe('on click reset button', () => {
    it('should call onResetClick once', () => {
      wrapper.find('.Reset button').simulate('click');

      expect(spyClick.calledOnce).to.be.true;
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
        expect(codeHoles.first().childAt(0).hasClass('ColorItem_color_green')).to.be.true;
        expect(codeHoles.at(1).childAt(0).hasClass('ColorItem_color_yellow')).to.be.true;
      });
    });

    describe('click 5 ClickableColor', () => {
      it('should pass correct color to first ColorItem on the second Row', () => {
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');

        const codeHoles = wrapper.find(Row).at(NB_ROWS - 2).find(ColorItem);
        expect(codeHoles.first().childAt(0).hasClass('ColorItem_color_green')).to.be.true;
      });
    });

    describe('click 4 ClickableColor', () => {
      it('should pass correct color to first KeyHole on the first Row', () => {
        wrapper.find('.ClickableColor_color_yellow').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_green').simulate('click');
        wrapper.find('.ClickableColor_color_yellow').simulate('click');

        const codeHoles = wrapper.find(Row).at(NB_ROWS - 1).find(KeyHole);
        expect(codeHoles.first().childAt(0).hasClass('KeyHole_color_black')).to.be.true;
      });

      describe('click all correct colors', () => {
        it('should display Solution', () => {
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

        it('should display Solution', () => {
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

      describe('on click reset button', () => {
        it('should hide Solution', () => {
          simulateLoose();
          simulateWin();

          wrapper.find('.Reset button').simulate('click');

          expect(wrapper.find('.Solution').exists()).to.be.false;
        });

        it('should hide Status', () => {
          simulateLoose();
          simulateWin();

          wrapper.find('.Reset button').simulate('click');

          expect(wrapper.find('.Status').exists()).to.be.false;
        });
      });
    });
  });
});
