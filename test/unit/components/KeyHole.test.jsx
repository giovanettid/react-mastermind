import KeyHole from 'components/KeyHole/KeyHole';

import { render, screen } from '@testing-library/react';

describe('KeyHole', () => {
  it('should display KeyHole with correct color', () => {
    render(
      <table>
        <tbody>
          <tr>
            <KeyHole color="Black" />
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByRole('cell')).toHaveClass('KeyHole_color_black');
  });
});
