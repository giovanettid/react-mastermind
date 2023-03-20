import Game from 'components/Game/Game';
import GameConfiguration from 'components/Game/GameConfiguration';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Game', () => {
  const configuration = () => ({ ...new GameConfiguration() });

  let user;
  let picker;

  beforeEach(() => {
    user = userEvent.setup();

    render(<Game configuration={configuration} />);
    picker = screen.getByRole('rowgroup', { name: 'Color Picker' });
  });

  it('should display ColorPicker with 6 ClickableColor', () => {
    expect(within(picker).getAllByRole('button')).toHaveLength(6);
  });

  describe('on click reset button', () => {
    const hasNumberOfGreyColorItems = (expectedNumber) => {
      const colorItems = screen.getAllByRole('cell', { name: 'Color Item' });
      const greyItems = colorItems.filter((item) => item.classList.contains('ColorItem_color_lightgrey'));

      expect(greyItems).toHaveLength(expectedNumber);
    };

    it('should reset game', async () => {
      hasNumberOfGreyColorItems(40);

      const [firstClickable] = within(picker).getAllByRole('button');
      await user.click(firstClickable);

      hasNumberOfGreyColorItems(39);

      await user.click(screen.getByText('New game'));

      hasNumberOfGreyColorItems(40);
    });
  });
});
