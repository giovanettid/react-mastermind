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

  let spyClick;

  const setup = () => {
    const user = userEvent.setup();

    const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);
    const colorsToGuess = ['Yellow', 'Yellow', 'Yellow', 'Yellow'];
    const colorsDecoder = new ColorsDecoder(colorsToGuess);
    const stateMutator = new BoardStateMutator(model, colorsDecoder);

    const utils = render(
      <Board
        colorsToPick={['Yellow', 'Green']}
        colorsToGuess={colorsToGuess}
        stateMutator={stateMutator}
        onResetClick={spyClick}
      />
    );
    const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

    return {
      ...utils,
      user,
      picker,
    };
  };

  beforeEach(() => {
    spyClick = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display Rows', () => {
      setup();

      expect(
        screen.getByRole('rowgroup', { name: 'Rows' })
      ).toBeInTheDocument();
    });

    it('should display nb rows*4 lightgrey ColorItem', () => {
      setup();

      expect(
        screen.getAllByRole('cell', { name: 'Color item lightgrey' })
      ).toHaveLength(NB_ROWS * NB_CODE_HOLES);
    });

    it('should display ColorPicker', () => {
      setup();

      expect(
        screen.getByRole('rowgroup', { name: 'Color Picker' })
      ).toBeInTheDocument();
    });

    it('should display 2 ClickableColor', () => {
      const { picker } = setup();

      expect(within(picker).getAllByRole('button')).toHaveLength(2);
    });

    it('should not display Status', () => {
      setup();

      expect(
        screen.queryByRole('rowgroup', { name: 'Status' })
      ).not.toBeInTheDocument();
    });

    it('should display reset button', () => {
      setup();

      expect(screen.getByText('New game')).toBeInTheDocument();
    });
  });

  describe('on click reset button', () => {
    it('should call onResetClick once', async () => {
      const { user } = setup();

      await user.click(screen.getByText('New game'));

      expect(spyClick).toHaveBeenCalledOnce();
    });
  });

  describe('click ClickableColor(s)', () => {
    const clickColors = (user, colors) =>
      Promise.all(colors.map((color) => user.click(color)));

    const simulateLoose = async (user, picker) => {
      const [, green] = within(picker).getAllByRole('button');
      await clickColors(user, Array(4).fill(green));
    };

    const simulateWin = async (user, picker) => {
      const [yellow] = within(picker).getAllByRole('button');
      await clickColors(user, Array(4).fill(yellow));
    };

    describe('click 2 ClickableColor', () => {
      it('should pass correct color to first and second ColorItem on the last Row (bottom of the screen)', async () => {
        const { user, picker } = setup();

        const [yellow, green] = within(picker).getAllByRole('button');
        await clickColors(user, [green, yellow]);

        const [, lastRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstCode, lastCode] = within(lastRow).getAllByLabelText(
          'Color Item',
          { exact: false }
        );

        expect(firstCode).toHaveAccessibleName('Color item Green');
        expect(lastCode).toHaveAccessibleName('Color item Yellow');
      });
    });

    describe('click 5 ClickableColor', () => {
      it('should pass correct color to first ColorItem on the first Row (top of the screen)', async () => {
        const { user, picker } = setup();

        const [yellow, green] = within(picker).getAllByRole('button');
        await clickColors(user, [yellow, yellow, green, yellow, green]);

        const [firstRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstCode] = within(firstRow).getAllByLabelText('Color Item', {
          exact: false,
        });

        expect(firstCode).toHaveAccessibleName('Color item Green');
      });
    });

    describe('click 4 ClickableColor', () => {
      it('should pass correct color to first KeyHole on the last Row', async () => {
        const { user, picker } = setup();

        const [yellow, green] = within(picker).getAllByRole('button');
        await clickColors(user, [yellow, green, green, yellow]);

        const [, lastRow] = screen.getAllByRole('row', { name: 'Row' });
        const [firstKey] = within(lastRow).getAllByRole('cell', {
          name: 'Key hole Black',
        });

        expect(firstKey).toBeInTheDocument();
      });

      describe('click all correct colors', () => {
        it('should display Solution', async () => {
          const { user, picker } = setup();

          expect(
            screen.queryByRole('rowgroup', { name: 'Solution' })
          ).not.toBeInTheDocument();

          await simulateWin(user, picker);

          expect(
            screen.getByRole('rowgroup', { name: 'Solution' })
          ).toBeInTheDocument();
        });

        it('should display win status message', async () => {
          const { user, picker } = setup();

          expect(
            screen.queryByRole('rowgroup', { name: 'Status' })
          ).not.toBeInTheDocument();

          await simulateWin(user, picker);

          expect(screen.getByText('You win')).toBeInTheDocument();
        });
      });
    });

    describe('click all colors', () => {
      describe('not guess correct colors', () => {
        it('should display loose status message', async () => {
          const { user, picker } = setup();

          await simulateLoose(user, picker);
          await simulateLoose(user, picker);

          expect(screen.getByText('You loose')).toBeInTheDocument();
        });

        it('should display Solution', async () => {
          const { user, picker } = setup();

          await simulateLoose(user, picker);
          await simulateLoose(user, picker);

          expect(
            screen.getByRole('rowgroup', { name: 'Solution' })
          ).toBeInTheDocument();
        });
      });

      describe('guess correct colors', () => {
        it('should display win status message', async () => {
          const { user, picker } = setup();

          await simulateLoose(user, picker);
          await simulateWin(user, picker);

          expect(screen.getByText('You win')).toBeInTheDocument();
        });
      });

      describe('on click reset button', () => {
        it('should hide Solution', async () => {
          const { user, picker } = setup();

          await simulateLoose(user, picker);
          await simulateWin(user, picker);

          await user.click(screen.getByText('New game'));

          expect(
            screen.queryByRole('rowgroup', { name: 'Solution' })
          ).not.toBeInTheDocument();
        });

        it('should hide Status', async () => {
          const { user, picker } = setup();

          await simulateLoose(user, picker);
          await simulateWin(user, picker);

          await user.click(screen.getByText('New game'));

          expect(
            screen.queryByRole('rowgroup', { name: 'Status' })
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
