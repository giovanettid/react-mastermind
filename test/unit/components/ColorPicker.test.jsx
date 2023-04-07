import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker from 'components/ColorPicker/ColorPicker';

describe('ColorPicker', () => {
  const sandbox = sinon.createSandbox();

  let spyClick;

  const setup = () => {
    const user = userEvent.setup();
    const utils = render(
      <ColorPicker colors={['Yellow', 'Black']} onColorClick={spyClick} />
    );
    const buttons = screen.getAllByRole('button');

    return {
      ...utils,
      buttons,
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
    it('should display ColorPicker with n ClickableColor', () => {
      const { buttons } = setup();
      const [yellow, black] = buttons;

      expect(buttons).toHaveLength(2);
      expect(yellow).toHaveAccessibleName('Click color Yellow');
      expect(black).toHaveAccessibleName('Click color Black');
    });
  });

  describe('click a ClickableColor', () => {
    it('should call onColorClick once', async () => {
      const { buttons, user } = setup();
      const [yellow] = buttons;

      await user.click(yellow);

      expect(spyClick).toHaveBeenCalledOnce();
    });
  });
});
