import { render, screen } from '@testing-library/react';

import Status from 'components/Status/Status';

describe('Status', () => {
  describe('render', () => {
    render(<Status message="You win" />);

    it('should display message', () => {
      expect(screen.getByText('You win')).toBeInTheDocument();
    });
  });
});
