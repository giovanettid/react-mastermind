import ClickableColor from 'components/ClickableColor/ClickableColor';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ClickableColor', () => {
  const sandbox = sinon.createSandbox();

  let user;
  let spyClick;

  beforeEach(() => {
    user = userEvent.setup();

    spyClick = sandbox.spy();
    render(
      <table>
        <tbody>
          <tr>
            <ClickableColor color="Red" onColorClick={spyClick} />
          </tr>
        </tbody>
      </table>,
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ClickableColor with a color', () => {
      expect(screen.getByRole('button')).toHaveClass('ClickableColor_color_red');
    });
  });

  describe('on click', () => {
    it('should call onColorClick once', async () => {
      await user.click(screen.getByRole('button'));

      expect(spyClick.calledOnce).toBeTruthy();
    });

    it('should call onColorClick with color prop', async () => {
      await user.click(screen.getByRole('button'));

      expect(spyClick.calledWith('Red')).toBeTruthy();
    });
  });
});
