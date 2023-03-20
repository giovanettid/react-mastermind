import Row from 'components/Row/Row';

import { render, screen } from '@testing-library/react';

describe('Row', () => {
  describe('render', () => {
    beforeEach(() => {
      render(
        <table>
          <tbody>
            <Row codeColors={['Yellow', 'lightgrey']} keyColors={['Black', 'White', 'lightgrey', 'lightgrey']} />
          </tbody>
        </table>,
      );
    });

    it('should display a Row with 2 ColorItem', () => {
      expect(screen.getAllByRole('cell', { name: 'Color Item' })).toHaveLength(2);
    });

    it('should display a Row with 4 Key Hole', () => {
      expect(screen.getAllByRole('cell', { name: 'Key Hole' })).toHaveLength(4);
    });

    it('should display a Row with 1 yellow ColorItem and 1 lightgrey', () => {
      const items = screen.getAllByRole('cell', { name: 'Color Item' });

      expect(items[0]).toHaveClass('ColorItem_color_yellow');
      expect(items[1]).toHaveClass('ColorItem_color_lightgrey');
    });

    it('should display a Row with 1 black KeyHole, 1 white KeyHole & 2 lightgrey', () => {
      const keys = screen.getAllByRole('cell', { name: 'Key Hole' });

      expect(keys[0]).toHaveClass('KeyHole_color_black');
      expect(keys[1]).toHaveClass('KeyHole_color_white');
      expect(keys[2]).toHaveClass('KeyHole_color_lightgrey');
      expect(keys[3]).toHaveClass('KeyHole_color_lightgrey');
    });
  });
});
