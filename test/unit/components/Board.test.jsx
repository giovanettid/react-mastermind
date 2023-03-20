import ColorsDecoder from 'components/Colors/ColorsDecoder';

import Board from 'components/Board/Board';
import BoardModel from 'components/Board/BoardModel';
import BoardStateMutator from 'components/Board/BoardStateMutator';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Board', () => {
  const NB_ROWS = 2;
  const NB_CODE_HOLES = 4;

  const sandbox = sinon.createSandbox();

  let user;
  let spyClick;

  beforeEach(() => {
    user = userEvent.setup();
    spyClick = sandbox.spy();

    const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);
    const colorsToGuess = ['Yellow', 'Yellow', 'Yellow', 'Yellow'];
    const colorsDecoder = new ColorsDecoder(colorsToGuess);
    const stateMutator = new BoardStateMutator(model, colorsDecoder);

    render(<Board
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
      expect(screen.getByRole('rowgroup', { name: 'Rows' })).toBeInTheDocument();
    });

    it('should display nb rows*4 lightgrey ColorItem', () => {
      expect(screen.getAllByRole('cell', { name: 'Color Item' })).toHaveLength(NB_ROWS * NB_CODE_HOLES);
    });

    it('should display ColorPicker', () => {
      expect(screen.getByRole('rowgroup', { name: 'Color Picker' })).toBeInTheDocument();
    });

    it('should display 2 ClickableColor', () => {
      const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

      expect(within(picker).getAllByRole('button')).toHaveLength(2);
    });

    it('should not display Status', () => {
      expect(screen.queryByRole('rowgroup', { name: 'Status' })).not.toBeInTheDocument();
    });

    it('should display reset button', () => {
      expect(screen.getByText('New game')).toBeInTheDocument();
    });
  });

  describe('on click reset button', () => {
    it('should call onResetClick once', async () => {
      await user.click(screen.getByText('New game'));

      expect(spyClick.calledOnce).toBeTruthy();
    });
  });

  describe('click ClickableColor(s)', () => {
    const simulateLoose = async () => {
      const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });
      const [, green] = within(picker).getAllByRole('button');

      await user.click(green);
      await user.click(green);
      await user.click(green);
      await user.click(green);
    };

    const simulateWin = async () => {
      const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });
      const [yellow] = within(picker).getAllByRole('button');

      await user.click(yellow);
      await user.click(yellow);
      await user.click(yellow);
      await user.click(yellow);
    };

    describe('click 2 ClickableColor', () => {
      it('should pass correct color to first and second ColorItem on the last Row (bottom of the screen)', async () => {
        const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

        const [yellow, green] = within(picker).getAllByRole('button');
        await user.click(green);
        await user.click(yellow);

        const [, lastRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstCode, lastCode] = within(lastRow).getAllByRole('cell', { name: 'Color Item' });

        expect(firstCode).toHaveClass('ColorItem_color_green');
        expect(lastCode).toHaveClass('ColorItem_color_yellow');
      });
    });

    describe('click 5 ClickableColor', () => {
      it('should pass correct color to first ColorItem on the first Row (top of the screen)', async () => {
        const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

        const [yellow, green] = within(picker).getAllByRole('button');
        await user.click(yellow);
        await user.click(yellow);
        await user.click(green);
        await user.click(yellow);
        await user.click(green);

        const [firstRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstCode] = within(firstRow).getAllByRole('cell', { name: 'Color Item' });

        expect(firstCode).toHaveClass('ColorItem_color_green');
      });
    });

    describe('click 4 ClickableColor', () => {
      it('should pass correct color to first KeyHole on the last Row', async () => {
        const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

        const [yellow, green] = within(picker).getAllByRole('button');
        await user.click(yellow);
        await user.click(green);
        await user.click(green);
        await user.click(yellow);

        const [, lastRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstKey] = within(lastRow).getAllByRole('cell', { name: 'Key Hole' });

        expect(firstKey).toHaveClass('KeyHole_color_black');
      });

      describe('click all correct colors', () => {
        it('should display Solution', async () => {
          expect(screen.queryByRole('rowgroup', { name: 'Solution' })).not.toBeInTheDocument();

          await simulateWin();

          expect(screen.queryByRole('rowgroup', { name: 'Solution' })).toBeInTheDocument();
        });

        it('should display win status message', async () => {
          expect(screen.queryByRole('rowgroup', { name: 'Status' })).not.toBeInTheDocument();

          await simulateWin();

          expect(screen.getByText('You win')).toBeInTheDocument();
        });
      });
    });

    describe('click all colors', () => {
      describe('not guess correct colors', () => {
        it('should display loose status message', async () => {
          await simulateLoose();
          await simulateLoose();

          expect(screen.getByText('You loose')).toBeInTheDocument();
        });

        it('should display Solution', async () => {
          await simulateLoose();
          await simulateLoose();

          expect(screen.queryByRole('rowgroup', { name: 'Solution' })).toBeInTheDocument();
        });
      });

      describe('guess correct colors', () => {
        it('should display win status message', async () => {
          await simulateLoose();
          await simulateWin();

          expect(screen.getByText('You win')).toBeInTheDocument();
        });
      });

      describe('on click reset button', () => {
        it('should hide Solution', async () => {
          await simulateLoose();
          await simulateWin();

          await user.click(screen.getByText('New game'));

          expect(screen.queryByRole('rowgroup', { name: 'Solution' })).not.toBeInTheDocument();
        });

        it('should hide Status', async () => {
          await simulateLoose();
          await simulateWin();

          await user.click(screen.getByText('New game'));

          expect(screen.queryByRole('rowgroup', { name: 'Status' })).not.toBeInTheDocument();
        });
      });
    });
  });
});
