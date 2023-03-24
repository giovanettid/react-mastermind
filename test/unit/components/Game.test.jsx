import Game from 'components/Game/Game';
import GameConfiguration from 'components/Game/GameConfiguration';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Game', () => {
  const configuration = () => ({ ...new GameConfiguration() });

  const setup = () => {
    const user = userEvent.setup();
    const utils = render(<Game configuration={configuration} />);
    const picker = screen.getByRole('rowgroup', { name: 'Color Picker' });

    return {
      ...utils,
      user,
      picker,
    };
  };

  it('should display ColorPicker with 6 ClickableColor', () => {
    const { picker } = setup();

    expect(within(picker).getAllByRole('button')).toHaveLength(6);
  });

  describe('on click reset button', () => {
    const greyColorItems = () => screen.getAllByRole('cell', { name: 'Color item lightgrey' });

    it('should reset game', async () => {
      const { user, picker } = setup();

      expect(greyColorItems()).toHaveLength(40);

      const [firstClickable] = within(picker).getAllByRole('button');
      await user.click(firstClickable);

      expect(greyColorItems()).toHaveLength(39);

      await user.click(screen.getByText('New game'));

      expect(greyColorItems()).toHaveLength(40);
    });
  });
});
