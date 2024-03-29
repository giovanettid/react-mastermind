import { render, screen } from '@testing-library/react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  it('should display ColorItem with correct color', () => {
    render(
      <table>
        <tbody>
          <tr>
            <ColorItem color="Green" />
          </tr>
        </tbody>
      </table>
    );

    expect(
      screen.getByRole('cell', { name: 'Color item Green' })
    ).toBeInTheDocument();
  });
});
