import { render, screen } from '@testing-library/react';

import KeyHole from 'components/KeyHole/KeyHole';

describe('KeyHole', () => {
  it('should display KeyHole with correct color', () => {
    render(
      <table>
        <tbody>
          <tr>
            <KeyHole color="Black" />
          </tr>
        </tbody>
      </table>
    );

    expect(
      screen.getByRole('cell', { name: 'Key hole Black' })
    ).toBeInTheDocument();
  });
});
