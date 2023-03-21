import ClickableColor from 'components/ClickableColor/ClickableColor';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ClickableColor', () => {
  const sandbox = sinon.createSandbox();

  let spyClick;

  const setup = () => {
    const user = userEvent.setup();
    const utils = render(
      <table>
        <tbody>
          <tr>
            <ClickableColor color="Red" onColorClick={spyClick} />
          </tr>
        </tbody>
      </table>,
    );

    return {
      ...utils,
      user,
    };
  };

  beforeEach(() => {
    spyClick = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ClickableColor with a color', () => {
      setup();
      expect(screen.getByRole('button')).toHaveClass('ClickableColor_color_red');
    });
  });

  describe('on click', () => {
    it('should call onColorClick once', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      expect(spyClick.calledOnce).toBeTruthy();
    });

    it('should call onColorClick with color prop', async () => {
      const { user } = setup();
      await user.click(screen.getByRole('button'));

      expect(spyClick.calledWith('Red')).toBeTruthy();
    });
  });
});
