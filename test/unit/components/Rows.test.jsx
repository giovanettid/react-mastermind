import Rows from 'components/Rows/Rows';

import { render, screen, within } from '@testing-library/react';

describe('Rows', () => {
  const setup = () => {
    const utils = render(
      <Rows
        boardCodeColors={[
          ['Red', 'Blue'],
          ['lightgrey', 'lightgrey'],
        ]}
        boardKeyColors={[
          ['White', 'lightgrey'],
          ['lightgrey', 'lightgrey'],
        ]}
      />
    );
    const rows = screen.getAllByRole('row', { name: 'Row' });

    return {
      ...utils,
      rows,
    };
  };

  describe('render', () => {
    it('should display Rows with 2 Row', () => {
      const { rows } = setup();

      expect(rows).toHaveLength(2);
    });
  });

  describe('inverse display from boardColors', () => {
    it('should pass Red code color to last Row', () => {
      const { rows } = setup();

      const [, lastRow] = rows;
      const [firstItem] = within(lastRow).getAllByLabelText('Color item', {
        exact: false,
      });

      expect(firstItem).toHaveAccessibleName('Color item Red');
    });

    it('should pass Withe key color to last Row', () => {
      const { rows } = setup();

      const [, lastRow] = rows;
      const [firstKey] = within(lastRow).getAllByRole('cell', {
        name: 'Key hole White',
      });

      expect(firstKey).toBeInTheDocument();
    });
  });
});
