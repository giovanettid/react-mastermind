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
      expect(items[0]).toHaveAccessibleName('Color item Yellow');
      expect(items[1]).toHaveAccessibleName('Color item Green');
      expect(items[2]).toHaveAccessibleName('Color item Green');
    });
  });
});
