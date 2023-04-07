import { render, screen } from '@testing-library/react';

import StatusFactory from 'components/Status/StatusFactory';

describe('StatusFactory', () => {
  describe('render', () => {
    describe('isWin true', () => {
      it('should display win message', () => {
        render(StatusFactory(true));

        expect(screen.getByText('You win')).toBeInTheDocument();
      });
    });

    describe('isWin false', () => {
      it('should display loose message', () => {
        render(StatusFactory(false));

        expect(screen.getByText('You loose')).toBeInTheDocument();
      });
    });
  });
});
