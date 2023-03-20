import Rows from 'components/Rows/Rows';

import { render, screen, within } from '@testing-library/react';

describe('Rows', () => {
  let rows;

  beforeEach(() => {
    render(<Rows
      boardCodeColors={[['Red', 'Blue'], ['lightgrey', 'lightgrey']]}
      boardKeyColors={[['White', 'lightgrey'], ['lightgrey', 'lightgrey']]}
    />);
    rows = screen.getAllByRole('row', { name: 'Row' });
  });

  describe('render', () => {
    it('should display Rows with 2 Row', () => {
      expect(rows).toHaveLength(2);
    });
  });

  describe('inverse display from boardColors', () => {
    it('should pass Red code color to last Row', () => {
      const [, lastRow] = rows;
      const [firstItem] = within(lastRow).getAllByRole('cell', { name: 'Color Item' });

      expect(firstItem).toHaveClass('ColorItem_color_red');
    });

    it('should pass Withe key color to last Row', () => {
      const [, lastRow] = rows;
      const [firstKey] = within(lastRow).getAllByRole('cell', { name: 'Key Hole' });

      expect(firstKey).toHaveClass('KeyHole_color_white');
    });
  });
});
