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
      expect(screen.getAllByLabelText('Color Item', { exact: false })).toHaveLength(2);
    });

    it('should display a Row with 4 Key Hole', () => {
      setup();
      expect(screen.getAllByLabelText('Key Hole', { exact: false })).toHaveLength(4);
    });

    it('should display a Row with 1 yellow ColorItem and 1 lightgrey', () => {
      setup();
      const [yellow, grey] = screen.getAllByLabelText('Color Item', { exact: false });

      expect(yellow).toHaveAccessibleName('Color item Yellow');
      expect(grey).toHaveAccessibleName('Color item lightgrey');
    });

    it('should display a Row with 1 black KeyHole, 1 white KeyHole & 2 lightgrey', () => {
      setup();

      expect(screen.getByRole('cell', { name: 'Key hole Black' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Key hole White' })).toBeInTheDocument();
      expect(screen.getAllByRole('cell', { name: 'Key hole lightgrey' })).toHaveLength(2);
    });
  });
});
