import ColorPicker from 'components/ColorPicker/ColorPicker';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ColorPicker', () => {
  const sandbox = sinon.createSandbox();

  let user;
  let spyClick;

  let buttons;

  beforeEach(() => {
    user = userEvent.setup();

    spyClick = sandbox.spy();
    render(<ColorPicker colors={['Yellow', 'Black']} onColorClick={spyClick} />);
    buttons = screen.getAllByRole('button');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should display ColorPicker with n ClickableColor', () => {
      const [yellow, black] = buttons;

      expect(buttons).toHaveLength(2);
      expect(yellow).toHaveClass('ClickableColor_color_yellow', { exact: false });
      expect(black).toHaveClass('ClickableColor_color_black', { exact: false });
    });
  });

  describe('click a ClickableColor', () => {
    it('should call onColorClick once', async () => {
      const [yellow] = buttons;

      await user.click(yellow);

      expect(spyClick.calledOnce).toBeTruthy();
    });
  });
});
