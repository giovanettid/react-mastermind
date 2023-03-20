import Status from 'components/Status/Status';

import { render, screen } from '@testing-library/react';

describe('Status', () => {
  describe('render', () => {
    render(<Status message="You win" />);

    it('should display message', () => {
      expect(screen.getByText('You win')).toBeInTheDocument();
    });
  });
});
