import Solution from 'components/Solution/Solution';

import { render, screen } from '@testing-library/react';

describe('Solution', () => {
  describe('render', () => {
    render(<Solution colors={['Yellow', 'Green', 'Green']} />);
    const items = screen.getAllByRole('cell');

    it('should display a Solution with 3 ColorItem', () => {
      expect(items).toHaveLength(3);
    });

    it('should display a Solution with 1 yellow ColorItem and 2 Green', () => {
      expect(items[0]).toHaveClass('ColorItem_color_yellow');
      expect(items[1]).toHaveClass('ColorItem_color_green');
      expect(items[2]).toHaveClass('ColorItem_color_green');
    });
  });
});
