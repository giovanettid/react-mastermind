import Row from 'components/Row/Row';

import { render, screen } from '@testing-library/react';

describe('Row', () => {
  describe('render', () => {
    const setup = () => render(
      <table>
        <tbody>
          <Row codeColors={['Yellow', 'lightgrey']} keyColors={['Black', 'White', 'lightgrey', 'lightgrey']} />
        </tbody>
      </table>,
    );

    it('should display a Row with 2 ColorItem', () => {
      setup();
      expect(screen.getAllByRole('cell', { name: 'Color Item' })).toHaveLength(2);
    });

    it('should display a Row with 4 Key Hole', () => {
      setup();
      expect(screen.getAllByRole('cell', { name: 'Key Hole' })).toHaveLength(4);
    });

    it('should display a Row with 1 yellow ColorItem and 1 lightgrey', () => {
      setup();
      const [yellow, grey] = screen.getAllByRole('cell', { name: 'Color Item' });

      expect(yellow).toHaveClass('ColorItem_color_yellow');
      expect(grey).toHaveClass('ColorItem_color_lightgrey');
    });

    it('should display a Row with 1 black KeyHole, 1 white KeyHole & 2 lightgrey', () => {
      setup();
      const [black, white, firstGrey, lastGrey] = screen.getAllByRole('cell', { name: 'Key Hole' });

      expect(black).toHaveClass('KeyHole_color_black');
      expect(white).toHaveClass('KeyHole_color_white');
      expect(firstGrey).toHaveClass('KeyHole_color_lightgrey');
      expect(lastGrey).toHaveClass('KeyHole_color_lightgrey');
    });
  });
});
