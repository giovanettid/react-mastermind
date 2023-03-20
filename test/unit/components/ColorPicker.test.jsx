import ColorPicker from 'components/ColorPicker/ColorPicker';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ColorPicker', () => {
  const sandbox = sinon.createSandbox();

  let user;
  let spyClick;

  beforeEach(() => {
    user = userEvent.setup();

    spyClick = sandbox.spy();
    render(<ColorPicker colors={['Yellow', 'Black']} onColorClick={spyClick} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ColorPicker with n ClickableColor', () => {
      const buttons = screen.getAllByRole('button');

      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveClass('ClickableColor_color_yellow', { exact: false });
      expect(buttons[1]).toHaveClass('ClickableColor_color_black', { exact: false });
    });
  });

  describe('click a ClickableColor', () => {
    it('should call onColorClick once', async () => {
      const buttons = screen.getAllByRole('button');

      await user.click(buttons[0]);

      expect(spyClick.calledOnce).toBeTruthy();
    });
  });
});
